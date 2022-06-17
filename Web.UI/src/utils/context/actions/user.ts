// create action for users
import { types } from '../reducers/user';
import { getMyUser, updateUser } from '../../../api/users.axios.api';
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

export const updateUserActions = async (dispatch: Function, user: UsersDetails) => {

    dispatch({
        type: types.UPDATE_USER_REQUEST,
    });

    try {
        const response = await updateUser(user);
        dispatch({
            type: types.UPDATE_USER_SUCCESS,
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}


