// create Reducer for user with initial state
import React from "react";
import { UserActionTypes } from "../actions/user";

export const userIS = {
    user: {
        id: '',
        name: '',
        email: '',
        role: '',
        token: '',
    },
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// create action types
export const types = {
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
}

// create reducer
export const userReducer = (state = userIS, action: UserActionTypes) => {
    switch (action.type) {
        case types.CREATE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isAuthenticated: true,
            };
        case types.GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isAuthenticated: true,
            };
        default:
            return state;
    }
}
