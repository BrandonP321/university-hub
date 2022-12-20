import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// TODO: abstract into shared workspace
/** Returns typed redux hooks for app selector and dispatch */
const getTypedReduxHooks = <TAppDispatch extends ThunkDispatch<any, any, any>, TRootState extends {}>() => {
    return {
        useAppSelector: useSelector as TypedUseSelectorHook<RootState>,
        useAppDispatch: () => useDispatch<AppDispatch>()
    }
}

export const { useAppDispatch, useAppSelector } = getTypedReduxHooks<AppDispatch, RootState>();

export const useResponsive = () => useAppSelector(state => state.responsive);