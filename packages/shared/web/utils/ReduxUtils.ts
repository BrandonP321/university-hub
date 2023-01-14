import { Store } from "@reduxjs/toolkit";
import { ReduxSliceHelper } from "../store";
import { ResponsiveSliceHelperInternal } from "../store/features/responsive/Responsive";
import { ReduxStore } from "./ReduxStore";

export class ReduxUtils {
    /** Creates ReduxStore instance for configuring a redux store */
    public static store = () => {
        return new ReduxStore({}, {});
    }

    // public static getResponsiveSliceHelper<TStore extends Store>(store: TStore) { return new ResponsiveSliceHelperInternal(store) }
    public static getResponsiveSliceHelper<TStore extends Store>(store: TStore) {
        return {
            responsive: new ResponsiveSliceHelperInternal(store)
        }
    }

    public static startSliceHelpers(helpers: ReduxSliceHelper[]) {
        helpers.forEach(h => h.onAppMount());
    }

    public static stopSliceHelpers(helpers: ReduxSliceHelper[]) {
        helpers.forEach(h => h.onAppUnmount())
    }
}
