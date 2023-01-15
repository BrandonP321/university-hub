import { ReduxUtils } from "../utils";

export const { store, useAppSelector, useAppDispatch, actions } = ReduxUtils.store().withDefaultReducers().create();
