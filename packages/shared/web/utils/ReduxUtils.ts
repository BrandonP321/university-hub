import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux/es/types";
import pageLoadingReducer from "../store/features/pageLoading/pageLoading"
import responsiveReducer from "../store/features/responsive/responsiveSlice"

class ReduxStore<T extends ReducersMapObject> {
    private _reducers;
    public get reducers() { return this._reducers };

    constructor(reducers: T) {
        this._reducers = reducers;
    }

    /** Returns all default reducers that can be added to store */
    private getDefaultReducers = () => ({
        pageLoading: () => this.addReducers({ pageLoading: pageLoadingReducer }),
        responsive: () => this.addReducers({ responsive: responsiveReducer })
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

        let store: ReduxStore<T & Partial<TDefaultReducerMap>> = this;
        let r: keyof typeof reducers;

        for (r in reducers) {
            store = store.with()[r]();
        }

        return store as ReduxStore<T & TDefaultReducerMap>;
    }

    /** Adds reducers to store and returns new ReduxStore instance for chaining of methods */
    public addReducers<TReducer extends ReducersMapObject>(reducer: TReducer) {
        return new ReduxStore({ ...this._reducers, ...reducer })
    }

    /**
     * Creates a redux store using reducers from previsouly chained methods
     * @returns Configured Redux store
     */
    public create = () => {
        const store = configureStore<T>({
            reducer: this._reducers
        })

        // const useAppSelector = useSelector as TypedUseSelectorHook<ReturnType>

        return { store }
    }
}

export class ReduxUtils {
    /** Creates ReduxStore instance for configuring a redux store */
    public static store = () => {
        return new ReduxStore({});
    }
}
