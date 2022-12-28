import { Action, ThunkAction } from "@reduxjs/toolkit";
import { ReduxUtils } from "@university-hub/shared/web/utils";

export const { store } = ReduxUtils.store().withDefaultReducers().create();

// Infer the `RootState` and `AppDispatch` from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type of reducers object for dispatch
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>