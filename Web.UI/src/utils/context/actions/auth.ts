import { authTypes } from "../reducers/auth";
import { checkLogin, registerAction } from "../../../api/login.axios.api";
import { NavigateFunction } from "react-router-dom";
import { IRegisterForm } from "../../../pages/RegisterPage";
export interface authActionTypes {
    type: string;
    payload?: any
}

export const authLoginRequest = async (dispatch: Function, navigate: NavigateFunction, payload: { email: string, password: string }) => {
    dispatch({
        type: authTypes.LOGIN_REQUEST,
    });

    try {
        const response = await checkLogin(payload);

        dispatch({
            type: authTypes.LOGIN_SUCCESS,
            payload: response.token,
        });

        localStorage.setItem("token", response.token);
        navigate("/FirstPage");
    } catch (error) {
        console.log(error);
    }
}

export const authLogoutRequest = (dispatch: Function, navigate: NavigateFunction) => {
    dispatch({
        type: authTypes.LOGOUT_REQUEST,
    });

    localStorage.removeItem("token");
    dispatch({
        type: authTypes.LOGOUT_SUCCESS,
    });
    navigate("/login");
}

export const authRegisterRequest = async (dispatch: Function, navigate: NavigateFunction, payload: IRegisterForm) => {
    dispatch({
        type: authTypes.REGISTER_REQUEST,
    });

    try {
        const response = await registerAction(payload);
        console.log("response", response);

        dispatch({
            type: authTypes.REGISTER_SUCCESS,
        });
        navigate("/login");
    } catch (error) {
        console.log(error);
    }
}