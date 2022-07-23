import { useParams } from "react-router-dom";
import { getMembers, joinAssos, removeMembers } from "../../../api/assos.axios";
import { MembersTypes } from "../reducers/members";
import { startLoader, endLoader } from "./loader";

export interface MembersActionTypes {
    type: string;
    payload?: any;
}

export const getMembersAction = async (dispatch: Function, idAssos: number) => {
    dispatch({
        type: MembersTypes.GET_MEMBERS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await getMembers(idAssos);
        dispatch({
            type: MembersTypes.GET_MEMBERS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}

export const removeMemberAction = (dispatch: Function, idAssos: number, idMember: number) => {
    dispatch({
        type: MembersTypes.UPDATE_MEMBER_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = removeMembers(idAssos, idMember);
        dispatch({
            type: MembersTypes.UPDATE_MEMBER_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}

export const joinAssosAction = (dispatch: Function, idAssos: number, idMember: number) => {
    dispatch({
        type: MembersTypes.UPDATE_MEMBER_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = joinAssos(idAssos, idMember);
        dispatch({
            type: MembersTypes.UPDATE_MEMBER_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}