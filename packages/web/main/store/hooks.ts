import { useAppDispatch, useAppSelector } from "./store";

/** Re-export app selector & dispatch hooks to have them exist in same file as other hooks */
export { useAppDispatch, useAppSelector }

export const useResponsive = () => useAppSelector(state => state.responsive);
export const usePageLoading = () => useAppSelector(state => state.pageLoading);