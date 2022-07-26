// create action for users
import { types } from '../reducers/user';
import { getMyAssos, getMyUser, updateUser } from '../../../api/users.axios.api';
import { UsersDetails } from '../reducers/admin';

export interface UserActionTypes {
    type: string;
    payload?: any;
}

export const getMyUserActions = async (dispatch: Function) => {

    dispatch({
        type: types.GET_MY_USER_REQUEST,
    });

    try {
        const response = await getMyUser();
        dispatch({
            type: types.GET_MY_USER_SUCCESS,
            payload: response,
        });


    } catch (error) {
        console.log(error);
    }
}

export const updateUserActions = async (dispatch: Function, user: UsersDetails, userID: number) => {

    dispatch({
        type: types.UPDATE_USER_REQUEST,
    });

    try {
        const response = await updateUser(user, userID);
        dispatch({
            type: types.UPDATE_USER_SUCCESS,
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getMyAssosActions = async (dispatch: Function, idUser: number) => {
    dispatch({
        type: types.GET_MY_ASSOS_REQUEST,
    });

    try {
        const response = await getMyAssos(idUser);
        dispatch({
            type: types.GET_MY_ASSOS_SUCCESS,
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}


