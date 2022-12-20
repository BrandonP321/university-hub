import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import responsiveReducer from "@/Features/responsive/responsiveSlice";

export const store = configureStore({
    reducer: {
        responsive: responsiveReducer
    }
})

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