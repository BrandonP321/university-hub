import { AnyAction, configureStore, Reducer, ReducersMapObject, StateFromReducersMapObject, Store } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux/es/types";
import pageLoadingReducer, { pageLoadingSliceActions } from "../store/features/pageLoading/pageLoading"
import responsiveReducer, { responsiveSliceActions } from "../store/features/responsive/responsiveSlice"

type ActionsMap<TReducer extends ReducersMapObject> = {
    [key in keyof TReducer]: {
        [key: string]: AnyAction
    }
}

export class ReduxStore<TReducer extends ReducersMapObject, TActions extends ActionsMap<TReducer>> {
    private _reducers;
    private _actions;
    public get reducers() { return this._reducers };
    public get actions() { return this._actions }

    constructor(reducers: TReducer, actions: TActions) {
        this._reducers = reducers;
        this._actions = actions;
    }

    /** Returns all default reducers that can be added to store */
    private getDefaultReducers = () => ({
        pageLoading: () => this.addReducers({ pageLoading: { reducer: pageLoadingReducer, actions: pageLoadingSliceActions } }),
        responsive: () => this.addReducers({ responsive: { reducer: responsiveReducer, actions: responsiveSliceActions } }),
    })

    /** Allows for chaining of a reducer method to add reducer to store */
    public with() {
        return this.getDefaultReducers()
    }

    /** Adds all default reducers to store */
    public withDefaultReducers() {
        const reducers = this.getDefaultReducers();

        /** Final type of ReduxStore after all default reducers have been added */
        type TDefaultReducerMap = {
            [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>["reducers"][key]
        }

        // let store: ReduxStore<TReducer & Partial<TDefaultReducerMap>> = this;
        let store: ReduxStore<TReducer & Partial<TDefaultReducerMap>, TActions> = this;
        let r: keyof typeof reducers;

        for (r in reducers) {
            store = store.with()[r]();
        }

        type TDefaultReducersMapWithCallbacks = ReturnType<typeof this.getDefaultReducers>;
        type TDefaultActionsMap = {[key in keyof TDefaultReducersMapWithCallbacks]: ReturnType<TDefaultReducersMapWithCallbacks[key]>}

        return store as ReduxStore<TReducer & TDefaultReducerMap, TActions & TDefaultActionsMap>;
    }

    /** Adds reducers to store and returns new ReduxStore instance for chaining of methods */
    public addReducers<T extends {[key in string]: { reducer: Reducer, actions: {[key: string]: AnyAction} }}>(slices: T) {
        type TNewReducers = {[key in keyof T]: T[key]["reducer"]};
        type TNewActions = {[key in keyof T]: T[key]["actions"]};

        const reducers: Partial<TNewReducers> = {};
        const actions: Partial<TNewActions> = {};

        Object.keys(slices).forEach((slice: keyof typeof slices) => {
            reducers[slice] = slices[slice].reducer;
            actions[slice] = slices[slice].actions;
        })

        return new ReduxStore({ ...this._reducers, ...reducers as TNewReducers }, { ...this._actions, ...actions as TNewActions });
    }

    /**
     * Creates a redux store using reducers from previsouly chained methods
     * @returns Configured Redux store
     */
    public create = () => {
        const store = configureStore<StateFromReducersMapObject<TReducer>>({
            reducer: this._reducers
        })

        return { store, ...this.getTypedHooks(store), actions: this.actions }
    }

    /** Returns typed `useSelector` and `useDispatch` hooks */
    public getTypedHooks<TStore extends ToolkitStore>(store: TStore) {
        return {
            useAppSelector: useSelector as TypedUseSelectorHook<ReturnType<TStore["getState"]>>,
            useAppDispatch: () => useDispatch<typeof store.dispatch>()
        }
    }
}