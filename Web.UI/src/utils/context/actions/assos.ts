import { deleteAssos, getAllAssos, getPostsByAssos, updateAssos } from "../../../api/assos.axios";
import { AssosDetails, AssosTypes } from "../reducers/assos";
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

export const updateAssosActions = async (dispatch: Function, data: AssosDetails, assosId: number) => {
    dispatch({
        type: AssosTypes.UPDATE_ASSOS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await updateAssos(data, assosId);
        dispatch({
            type: AssosTypes.UPDATE_ASSOS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}

export const deleteAssosActions = async (dispatch: Function, assosId: number) => {
    dispatch({
        type: AssosTypes.DELETE_ASSOS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await deleteAssos(assosId);
        dispatch({
            type: AssosTypes.DELETE_ASSOS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}

export const getPostsByAssosActions = async (dispatch: Function, assosId: number) => {
    dispatch({
        type: AssosTypes.GET_ASSOS_EVENTS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await getPostsByAssos(assosId);
        dispatch({
            type: AssosTypes.GET_ASSOS_EVENTS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}