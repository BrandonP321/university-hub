import { Store } from "@reduxjs/toolkit";
import { ReduxStore, SliceHelperImport } from "./ReduxStore";

export class ReduxUtils {
    /** Creates ReduxStore instance for configuring a redux store */
    public static store = () => {
        return new ReduxStore({}, {}, {});
    }

    /** Calls `onAppMount()` on each ReduxSliceHelper relevant to store */
    public static startSliceHelpers<TStore extends Store>(helpers: SliceHelperImport[], store: TStore) {
        Promise.all(helpers).then(resolvedHelpers => {
            resolvedHelpers.forEach(({ default: SliceHelper }) => (new SliceHelper(store)).onAppMount())
        })
    }

    /** Calls `onAppUnmount()` on each ReduxSliceHelper relevant to store */
    public static stopSliceHelpers<TStore extends Store>(helpers: SliceHelperImport[], store: TStore) {
        Promise.all(helpers).then(resolvedHelpers => {
            resolvedHelpers.forEach(({ default: SliceHelper }) => (new SliceHelper(store)).onAppUnmount())
        })
    }
}
