import { getAllAssos } from "../../../api/assos.axios";
import { AssosTypes } from "../reducers/assos";
import { startLoader, endLoader } from "./loader";

export interface AssosActionTypes {
    type: string;
    payload?: any;
}

export const getAllAssosActions = async (dispatch: Function) => {
    dispatch({
        type: AssosTypes.GET_ASSOS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await getAllAssos();
        dispatch({
            type: AssosTypes.GET_ASSOS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}