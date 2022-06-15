// create action for users
import { types } from '../reducers/user';
import { getMyUser } from '../../../api/users.axios.api';

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


