import { Store } from "@reduxjs/toolkit";
import { ReduxSliceHelper } from "../..";
import { responsiveSliceActions, ResponsiveState } from "./responsiveSlice";

class MediaQuery {
	private _maxWidth;
	private _query;
    /** Last 'matches' value when media event was last fired */
	public lastMatchValue = false;

	public get query() { return this._query };

	public get maxWidth() { return this._maxWidth };

	constructor(maxWidth: number) {
		this._maxWidth = maxWidth;
		this._query = window.matchMedia(`screen and (max-width: ${maxWidth}px)`);
	}

	public get matches () {
		return this._query.matches;
	}

    /** Updates whether or not query matched on last event fire */
	public setMatches = (matches: boolean) => {
		this.lastMatchValue = matches;
	}
};

/**
 * Utility class for logic around updating Responsive slice in redux store
 */
export class ResponsiveSliceHelperInternal<T extends Store> implements ReduxSliceHelper {
	/* redux store instanced passed in to constructor */
	private store;

	constructor(store: T) {
		this.store = store;
	}

	/* All media queries */
	private queries: { [key in keyof ResponsiveState]: MediaQuery } = {
		max: new MediaQuery(1664),
		large: new MediaQuery(1200),
		medium: new MediaQuery(992),
		mobile: new MediaQuery(768),
		tiny: new MediaQuery(480),
		pico: new MediaQuery(350),
	}

	/* Getters for retrieving status of each media query */
	public get max() { return this.queries.max.matches };
	public get large() { return this.queries.large.matches };
	public get medium() { return this.queries.medium.matches };
	public get mobile() { return this.queries.mobile.matches };
	public get tiny() { return this.queries.tiny.matches };
	public get pico() { return this.queries.pico.matches };

	public onAppMount = () => {
		this.addMediaQueryListeners();
	}

	public onAppUnmount = () => {
		window.removeEventListener("resize", this.checkMediaQueries)
	}

	/* Adds resize event listener to window for checking queries on window resize */
	private addMediaQueryListeners = () => {
		// perform initial check on all queries
		this.checkMediaQueries();

		window.addEventListener("resize", this.checkMediaQueries)
	}

	/* Checks all media queries and dispatches any changed breakpoints to redux store */
	private checkMediaQueries = () => {
		let queryKey: keyof typeof this.queries;
		for (queryKey in this.queries) {
			const mq = this.queries[queryKey];

			const matches = mq.query.matches;

			// if boolean match value of query has changed, dispatch new value to redux state
			if (matches !== mq.lastMatchValue) {
				this.handleMediaQueryChange({ breakpoint: queryKey, matches });
				// update matches value on MediaQuery
				mq.setMatches(matches);
			}
		}
	}

	/* Dispatches new media query status to redux store */
	private handleMediaQueryChange = ({ breakpoint, matches }: { breakpoint: keyof ResponsiveState, matches: boolean }) => {
		this.store.dispatch(responsiveSliceActions.breakpointHit({ breakpoint, matches }))
	}
}