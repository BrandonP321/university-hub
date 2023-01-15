import { ReduxUtils } from "@university-hub/shared/web/utils/ReduxUtils";

export const { store, useAppSelector, useAppDispatch, actions, sliceHelpers } = ReduxUtils.store().withDefaultReducers().create();
