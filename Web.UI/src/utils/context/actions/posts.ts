import { createChildPosts, createPosts, getAllPostsFromAllAssos, getCommentsPosts, getPosts } from "../../../api/assos.axios";
import { CommentTypes } from "../reducers/coments";
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

export const getCommentsAction = async (dispatch: Function) => {
    dispatch({
        type: CommentTypes.GET_COMMENT_REQUEST
    });

    const response = await getCommentsPosts();
    dispatch({
        type: CommentTypes.GET_COMMENT_SUCCESS,
        payload: response,
    });
}

export const postChildPostsAction = async (dispatch: Function, data: any) => {
    dispatch({
        type: PostsTypes.CREATE_POSTS_REQUEST,
    });
    const response = await createChildPosts(data);
    dispatch({
        type: PostsTypes.CREATE_POSTS_SUCCESS,
        payload: response,
    });
}

export const getAllPostsFromAllAssosAction = async (dispatch: Function, pageNumber: number) => {
    dispatch({
        type: PostsTypes.GET_ALL_POSTS_FROM_ALL_ASSOS_REQUEST,
    });
    const response = await getAllPostsFromAllAssos(pageNumber);

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