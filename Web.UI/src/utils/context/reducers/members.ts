import { MembersActionTypes } from "../actions/members";
import { MemberAssosState } from "./assos";

export interface MembersState {
    memberList: MemberAssosState[],
    needRefreshMember: boolean
}

export const MembersIS: MembersState = {
    memberList: [],
    needRefreshMember: true
}

export const MembersTypes = {
    GET_MEMBERS_REQUEST: 'GET_MEMBERS_REQUEST',
    GET_MEMBERS_SUCCESS: 'GET_MEMBERS_SUCCESS',
    UPDATE_MEMBER_REQUEST: 'UPDATE_MEMBER_REQUEST',
    UPDATE_MEMBER_SUCCESS: 'UPDATE_MEMBER_SUCCESS',
}

export const MembersReducer = (state = MembersIS, action: MembersActionTypes) => {
    switch (action.type) {
        case MembersTypes.GET_MEMBERS_REQUEST:
            return {
                ...state,
            };
        case MembersTypes.GET_MEMBERS_SUCCESS:
            return {
                ...state,
                memberList: action.payload,
                needRefreshMember: false
            };
        case MembersTypes.UPDATE_MEMBER_REQUEST:
            return {
                ...state,
                needRefreshMember: false
            };
        case MembersTypes.UPDATE_MEMBER_SUCCESS:
            return {
                ...state,
                memberList: [action.payload, ...state.memberList],
                needRefreshMember: true
            };
        default:
            return state;
    }
}

