// create Reducer for user with initial state
import React from "react";
import { UserActionTypes } from "../actions/user";

export const userIS = {
    id: 0,
    name: '',
    email: '',
    roles: Array<string>(),
    token: '',
    error: null,
};

// create action types
export const types = {
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    GET_MY_USER_REQUEST: 'GET_MY_USER_REQUEST',
    GET_MY_USER_SUCCESS: 'GET_MY_USER_SUCCESS',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
}

// create reducer
export const userReducer = (state = userIS, action: UserActionTypes) => {
    switch (action.type) {
        case types.CREATE_USER_REQUEST:
            return {
                ...state,
            };
        case types.CREATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case types.GET_MY_USER_REQUEST:
            return {
                ...state,
            }
        case types.GET_MY_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case types.UPDATE_USER_REQUEST:
            return {
                ...state,
            }
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
