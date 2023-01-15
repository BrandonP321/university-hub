import { Store } from "@reduxjs/toolkit"

/**
 * ReduxSliceHelper is designed to be implemented by other slice helper classes to assist in firing events at app mount & unmount.  
 * Each slice helper class MUST BE THE DEFAULT EXPORT of its file, as the import() function needs to be used to import each helper class 
 * to avoid any accidental use of the window API on the server of a Next.js app
 */
export class ReduxSliceHelper<TStore extends Store = Store> {
    protected store;

    constructor(store: TStore) {
        this.store = store;
    }

    public onAppMount = () => {}
    public onAppUnmount = () => {}
}