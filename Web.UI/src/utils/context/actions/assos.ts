import { useNavigate } from "react-router-dom";
import { createAssos, deleteAssos, getAllAssos, getPostsByAssos, removeMembers, updateAssos } from "../../../api/assos.axios";
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

export const createAssosActions = async (dispatch: Function, data: AssosDetails, id: number) => {
    dispatch({
        type: AssosTypes.CREATE_ASSOS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await createAssos(data, id);
        dispatch({
            type: AssosTypes.CREATE_ASSOS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);
    } catch (error) { console.log(error), endLoader(dispatch); }
}

export const deleteUserFromAsso = async (dispatch: Function, assoId: number, memberId: number) => {
    dispatch({
        type: AssosTypes.DELETE_ASSOS_USER_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await removeMembers(assoId, memberId);
        dispatch({
            type: AssosTypes.DELETE_ASSOS_USER_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error), endLoader(dispatch); }
}

// export const joinAssos = async (dispatch: Function, assoId: number, userId: number) => {
//     dispatch({
//         type: AssosTypes.JOIN_ASSOS_REQUEST,
//     });

//     startLoader(dispatch)

//     try {
//         const response = await addMembers(assoId, userId);
//         dispatch({
//             type: AssosTypes.JOIN_ASSOS_SUCCESS,
//             payload: response,
//         });

//         endLoader(dispatch);

//     } catch (error) { console.log(error) }
// }