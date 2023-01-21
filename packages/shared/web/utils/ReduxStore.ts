import { AnyAction, configureStore, Reducer, ReducersMapObject, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { ReduxSliceHelper } from "../store";
import pageLoadingReducer, { pageLoadingSliceActions } from "../store/features/pageLoading/pageLoading"
import responsiveReducer, { responsiveSliceActions } from "../store/features/responsive/responsiveSlice"

type ActionsMap<TReducer extends ReducersMapObject> = {
    [key in keyof TReducer]: {
        [key: string]: AnyAction
    }
}

export type SliceHelpersMap<TReducersMap extends {}> = {[key in keyof Partial<TReducersMap>]: Promise<any>}
export type SliceHelperImport = Promise<{ default: typeof ReduxSliceHelper }>;

/** 
 * Allows use of method chaining to easily configure a redux store with any number redux 
 * slices with reducers, actions, and slice helpers 
 */
export class ReduxStore<TReducer extends ReducersMapObject, TActions extends ActionsMap<TReducer>, TSliceHelpers extends SliceHelpersMap<TReducer>> {
    private _reducers;
    private _actions;
    private _sliceHelpers;

    public get reducers() { return this._reducers };
    public get actions() { return this._actions };
    public get sliceHelpers() { return this._sliceHelpers };

    constructor(reducers: TReducer, actions: TActions, sliceHelpers: TSliceHelpers) {
        this._reducers = reducers;
        this._actions = actions;
        this._sliceHelpers = sliceHelpers;
    }

    /** Returns all default reducers that can be added to store */
    private getDefaultReducers = () => ({
        pageLoading: () => this.addReducers({ pageLoading: { reducer: pageLoadingReducer, actions: pageLoadingSliceActions }}),
        responsive: () => this.addReducers({ responsive: { 
            reducer: responsiveReducer, actions: responsiveSliceActions, sliceHelpers: import("../store/features/responsive/Responsive")
        }}), 
    })

    /** Allows for chaining of a reducer function from `.getDefaultReducers()` to add that reducer to the store */
    public with() {
        return this.getDefaultReducers()
    }

    /** Adds all default reducers from `.getDefaultReducers()` to store */
    public withDefaultReducers() {
        const reducers = this.getDefaultReducers();

        /** Final type of ReduxStore after all default reducers have been added */
        type TDefaultReducerMap = {[key in keyof typeof reducers]: ReturnType<typeof reducers[key]>["reducers"][key]};
        type TDefaultActionsMap = {[key in keyof typeof reducers]: ReturnType<typeof reducers[key]>["actions"][key]};
        type TDefaultSliceHelpersMap = {[key in keyof typeof reducers]: ReturnType<typeof reducers[key]>["sliceHelpers"][key]};

        let store: ReduxStore<TReducer & Partial<TDefaultReducerMap>, TActions, TSliceHelpers & Partial<TDefaultSliceHelpersMap>> = this;
        let r: keyof typeof reducers;

        for (r in reducers) {
            store = store.with()[r]();
        }

        type TNewStore = ReduxStore<TReducer & TDefaultReducerMap, TActions & TDefaultActionsMap, TSliceHelpers & TDefaultSliceHelpersMap>;

        /** Binding store to correctly typed variable keeps TS happy */
        const newStore: TNewStore = store as TNewStore;

        return newStore;
    }

    /** Adds any number of reducers to store and returns new ReduxStore instance for chaining of methods */
    public addReducers<T extends {[key in string]: { reducer: Reducer, actions: {[key: string]: AnyAction}, sliceHelpers?: SliceHelpersMap<{}> }}>(slices: T) {
        type TNewReducers = {[key in keyof T]: T[key]["reducer"]};
        type TNewActions = {[key in keyof T]: T[key]["actions"]};
        type TNewSliceHelpers = {[key in keyof T]: T[key]["sliceHelpers"]};

        const reducers: Partial<TNewReducers> = {};
        const actions: Partial<TNewActions> = {};
        const sliceHelpers: Partial<TNewSliceHelpers> = {};

        Object.keys(slices).forEach((slice: keyof typeof slices) => {
            reducers[slice] = slices[slice].reducer;
            actions[slice] = slices[slice].actions;

            if (slices[slice].sliceHelpers) {
                sliceHelpers[slice] = slices[slice].sliceHelpers;
            }
        })

        return new ReduxStore(
            { ...this._reducers, ...reducers as TNewReducers }, 
            { ...this._actions, ...actions as TNewActions },
            { ...this._sliceHelpers, ...sliceHelpers as TNewSliceHelpers }
        );
    }

    /**
     * Creates a redux store using reducers from previsouly chained methods
     * @returns Configured Redux store
     */
    public create = () => {
        const store = configureStore<StateFromReducersMapObject<TReducer>>({
            reducer: this._reducers
        })

        const sliceHelpers: SliceHelperImport[] = [];

        Object.keys(this.sliceHelpers).forEach((k: keyof typeof this.sliceHelpers) => {
            sliceHelpers.push(this.sliceHelpers[k]);
        })

        return { store, ...this.getTypedHooks(store), actions: this.actions, sliceHelpers }
    }

    /** Returns typed `useSelector` and `useDispatch` hooks */
    public getTypedHooks<TStore extends ToolkitStore>(store: TStore) {
        return {
            useAppSelector: useSelector as TypedUseSelectorHook<ReturnType<TStore["getState"]>>,
            useAppDispatch: () => useDispatch<typeof store.dispatch>()
        }
    }
}
