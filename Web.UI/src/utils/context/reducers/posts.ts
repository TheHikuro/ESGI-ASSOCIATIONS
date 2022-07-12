import { PostsActionTypes } from "../actions/posts"
import { PostsAssosState } from "./assos"

export interface PostsState {
    postsList: PostsAssosState[]
    needRefreshPosts: boolean
}

export const PostsIS: PostsState = {
    postsList: [],
    needRefreshPosts: true
}

export const PostsTypes = {
    GET_POSTS_REQUEST: 'GET_POSTS_REQUEST',
    GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
    DELETE_POSTS_REQUEST: 'DELETE_POSTS_REQUEST',
    DELETE_POSTS_SUCCESS: 'DELETE_POSTS_SUCCESS',
    CREATE_POSTS_REQUEST: 'CREATE_POSTS_REQUEST',
    CREATE_POSTS_SUCCESS: 'CREATE_POSTS_SUCCESS',
    GET_CHILD_POSTS_REQUEST: 'GET_CHILD_POSTS_REQUEST',
    GET_CHILD_POSTS_SUCCESS: 'GET_CHILD_POSTS_SUCCESS',
    GET_ALL_POSTS_FROM_ALL_ASSOS_REQUEST: 'GET_ALL_POSTS_FROM_ALL_ASSOS_REQUEST',
    GET_ALL_POSTS_FROM_ALL_ASSOS_SUCCESS: 'GET_ALL_POSTS_FROM_ALL_ASSOS_SUCCESS',
}

export const PostsReducer = (state = PostsIS, action: PostsActionTypes) => {
    switch (action.type) {
        case PostsTypes.GET_POSTS_REQUEST:
            return {
                ...state,
            };
        case PostsTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                postsList: action.payload,
                needRefreshPosts: false
            };
        case PostsTypes.GET_ALL_POSTS_FROM_ALL_ASSOS_REQUEST:
            return {
                ...state,
            };
        case PostsTypes.GET_ALL_POSTS_FROM_ALL_ASSOS_SUCCESS:
            return {
                ...state,
                postsList: [...state.postsList, ...action.payload],
                needRefreshPosts: false
            };
        case PostsTypes.DELETE_POSTS_REQUEST:
            return {
                ...state,
                needRefreshPosts: true
            };
        case PostsTypes.DELETE_POSTS_SUCCESS:
            return {
                ...state,
                postsList: state.postsList.filter(posts => posts.id !== action.payload),
                needRefreshPosts: true
            };
        case PostsTypes.CREATE_POSTS_REQUEST:
            return {
                ...state,
                needRefreshPosts: false
            };
        case PostsTypes.CREATE_POSTS_SUCCESS:
            return {
                ...state,
                postsList: [...state.postsList, action.payload],
                needRefreshPosts: false
            };
        default:
            return state;
    }
}