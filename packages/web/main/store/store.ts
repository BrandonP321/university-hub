import { ReduxUtils } from "@university-hub/shared/web/utils/ReduxUtils";

export const { store, useAppSelector, useAppDispatch } = ReduxUtils.store().withDefaultReducers().create();

export const ReduxSliceHelpers = [
    ReduxUtils.getResponsiveSliceHelper(store).responsive
]