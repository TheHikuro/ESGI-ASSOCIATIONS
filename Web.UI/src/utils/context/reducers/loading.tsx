import { LoadingActionType } from "../actions/loader";

export enum LoadingType {
    START = 'START',
    STOP = 'STOP',
}

export const loaderIS = {
    isLoading: false,
}

const loaderReducer = (state = loaderIS, action: LoadingActionType) => {
    switch (action.type) {
        case LoadingType.START:
            return {
                ...state,
                isLoading: true,
            }
        case LoadingType.STOP:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;

    }
}

export default loaderReducer;