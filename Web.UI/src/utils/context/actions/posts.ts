import { createChildPosts, createPosts, getAllPostsFromAllAssos, getChildPosts, getPosts } from "../../../api/assos.axios";
import { PostsTypes } from "../reducers/posts";

export interface PostsActionTypes {
    type: string;
    payload?: any;
}

export const getPostsAction = async (dispatch: Function, assosId: number) => {
    dispatch({
        type: PostsTypes.GET_POSTS_REQUEST,
    });
    const response = await getPosts(assosId);
    dispatch({
        type: PostsTypes.GET_POSTS_SUCCESS,
        payload: response,
    });
}

export const getChildPostsAction = async (dispatch: Function, parentId: number) => {
    dispatch({
        type: PostsTypes.GET_CHILD_POSTS_REQUEST,
    });
    const response = await getChildPosts(parentId);
    dispatch({
        type: PostsTypes.GET_CHILD_POSTS_SUCCESS,
        payload: response,
    });
}

export const postChildPostsAction = async (dispatch: Function, data: any, idParent: number) => {
    dispatch({
        type: PostsTypes.CREATE_POSTS_REQUEST,
    });
    const response = await createChildPosts(data, idParent);
    dispatch({
        type: PostsTypes.CREATE_POSTS_SUCCESS,
        payload: response,
    });
}

export const getAllPostsFromAllAssosAction = async (dispatch: Function, userId: number, pageNumber: number) => {
    dispatch({
        type: PostsTypes.GET_ALL_POSTS_FROM_ALL_ASSOS_REQUEST,
    });
    const response = await getAllPostsFromAllAssos(userId, pageNumber);

    dispatch({
        type: PostsTypes.GET_ALL_POSTS_FROM_ALL_ASSOS_SUCCESS,
        payload: response,
    });
}

export const createPostsAction = async (dispatch: Function, data: any) => {
    dispatch({
        type: PostsTypes.CREATE_POSTS_REQUEST,
    });
    const response = await createPosts(data);
    dispatch({
        type: PostsTypes.CREATE_POSTS_SUCCESS,
        payload: response,
    });
}