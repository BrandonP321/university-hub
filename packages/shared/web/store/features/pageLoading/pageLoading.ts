import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type pageLoadingState = { loading: boolean };

const initialState: pageLoadingState = { loading: true };

/**
 * Shows/hides loading spinner over entire page
 */
const pageLoading = createSlice({
    name: "responsive",
    initialState,
    reducers: {
        setShowPageSpinner: (state, action: PayloadAction<{ loading: boolean }>) => {
            state.loading = action.payload.loading;
        }
    }
});

export const pageLoadingSliceActions = pageLoading.actions;
export default pageLoading.reducer;