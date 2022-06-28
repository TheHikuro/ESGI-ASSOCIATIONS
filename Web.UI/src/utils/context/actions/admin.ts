import { getUsers, updateUser } from "../../../api/users.axios.api";
import { AdminTypes, UsersDetails } from "../reducers/admin";
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

export const updateAdminUsersActions = async (dispatch: Function, user: UsersDetails, userID: number) => {
    dispatch({
        type: AdminTypes.UPDATE_USER_REQUEST,
    });

    startLoader(dispatch)

    try {
        const response = await updateUser(user, userID);
        dispatch({
            type: AdminTypes.UPDATE_USER_SUCCESS,
            payload: response,
        });

        endLoader(dispatch);

    }
    catch (error) { console.log(error) }

}