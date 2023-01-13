import { ReduxUtils } from "@university-hub/shared/web/utils/ReduxUtils";

export const { store, useAppSelector, useAppDispatch } = ReduxUtils.store().withDefaultReducers().create();
