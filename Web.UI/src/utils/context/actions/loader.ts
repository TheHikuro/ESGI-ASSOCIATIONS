import { LoadingType } from "../reducers/loading";

export type LoadingActionType = {
    type: LoadingType;
}

export const startLoader = (dispatch: Function) => {
    dispatch({
        type: LoadingType.START,
    });
}

export const endLoader = (dispatch: Function) => {
    dispatch({
        type: LoadingType.STOP,
    });
}
