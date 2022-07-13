import { CommentsAssosState } from "./assos";

export interface CommentState {
    commentList: CommentsAssosState[],
    needRefreshComment: boolean
}

export const CommentIS: CommentState = {
    commentList: [],
    needRefreshComment: true
}

export const CommentTypes = {
    GET_COMMENT_REQUEST: 'GET_COMMENT_REQUEST',
    GET_COMMENT_SUCCESS: 'GET_COMMENT_SUCCESS',
    DELETE_COMMENT_REQUEST: 'DELETE_COMMENT_REQUEST',
    DELETE_COMMENT_SUCCESS: 'DELETE_COMMENT_SUCCESS',
    CREATE_COMMENT_REQUEST: 'CREATE_COMMENT_REQUEST',
    CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',
}

export const CommentReducer = (state = CommentIS, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case CommentTypes.GET_COMMENT_REQUEST:
            return {
                ...state,
            };
        case CommentTypes.GET_COMMENT_SUCCESS:
            return {
                ...state,
                commentList: action.payload,
                needRefreshComment: false
            };
        case CommentTypes.DELETE_COMMENT_REQUEST:
            return {
                ...state,
                needRefreshComment: true
            };
        case CommentTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                commentList: state.commentList.filter(comment => comment.id !== action.payload),
                needRefreshComment: true
            };
        case CommentTypes.CREATE_COMMENT_REQUEST:
            return {
                ...state,
                needRefreshComment: false
            };
        case CommentTypes.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                commentList: [...state.commentList, action.payload],
                needRefreshComment: true
            };
        default:
            return state;
    }
}