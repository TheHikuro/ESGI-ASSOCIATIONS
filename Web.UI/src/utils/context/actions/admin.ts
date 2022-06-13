import { getUsers } from "../../../api/users.axios.api";
import { AdminTypes } from "../reducers/admin";
import { endLoader, startLoader } from "./loader";

export interface UserActionTypes {
    type: string;
    payload?: any;
}

export const getUsersActions = async (dispatch: Function) => {
    dispatch({
        type: AdminTypes.GET_USERS_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await getUsers();
        dispatch({
            type: AdminTypes.GET_USERS_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    } catch (error) { console.log(error) }
}