import { ReduxUtils } from "../utils";

export const { store, useAppSelector, useAppDispatch, actions } = ReduxUtils.store().withDefaultReducers().create();
// TODO: export all custom hooks (e.g. useResponsive, etc.) to be re-exported in each package
export const usePageLoading = () => useAppSelector(state => state.pageLoading);