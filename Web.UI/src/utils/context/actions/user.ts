// create action for users
import { types } from '../reducers/user';
import { getUsers } from '../../../api/users.axios.api';

export interface UserActionTypes {
    type: string;
    payload?: any;
}

export const getUsersActions = async (dispatch: Function) => {

    dispatch({
        type: types.GET_USER_REQUEST,
    });

    try {
        const response = await getUsers();
        dispatch({
            type: types.GET_USER_SUCCESS,
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
};




