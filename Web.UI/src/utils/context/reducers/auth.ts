import React from "react";
import { authActionTypes } from "../actions/auth";

export const authTypes = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGOUT_REQUEST: "LOGOUT_REQUEST",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE",
    REGISTER_REQUEST: "REGISTER_REQUEST",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAILURE: "REGISTER_FAILURE",
}

export const authIS = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    error: null,
    token: localStorage.getItem("token") || '',
    activated: false,
    associationsCount: 0,
}

export const authReducer = (state = {}, action: authActionTypes) => {

    switch (action.type) {
        case authTypes.LOGIN_REQUEST:
            return {
                ...state,
            };
        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload?.token,
                activated: action.payload?.activated,
                associationsCount: action.payload?.associationsCount,
            };
        case authTypes.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case authTypes.LOGOUT_REQUEST:
            return {
                ...state,
            };
        case authTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                token: '',
            };
        case authTypes.LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case authTypes.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case authTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        case authTypes.REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}