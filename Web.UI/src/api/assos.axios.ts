import { AssosDetails } from "../utils/context/reducers/assos";
import { getAxiosInstance } from "./apiUtils";

const instance = getAxiosInstance();

export const getAllAssos = async () => {
    const response = await instance.get(`/associations`);
    return response.data;
}

export const updateAssos = async (data: AssosDetails, assosId: number) => {
    const response = await instance.put(`/associations/${assosId}`, data);
    return response.data;
}

export const deleteAssos = async (assosId: number) => {
    const response = await instance.delete(`/associations/${assosId}`);
    return response.data;
}

export const getPostsByAssos = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/posts`);
    return response.data;
}
export const getMembers = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/members`);
    return response.data;
}

export const removeMembers = async (assosId: number, memberId: number) => {
    const response = await instance.delete(`/associations/${assosId}/members/${memberId}`);
    return response.data;
}

export const getEvents = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/events`);
    return response.data;
}

export const getPosts = async (assosId: number) => {
    const response = await instance.get(`/associations/${assosId}/posts`);
    return response.data;
}

export const getChildPosts = async (parentId: number) => {
    const response = await instance.get(`/posts/${parentId}/child_posts`);
    return response.data;
}

export const createChildPosts = async (data: any, idParent: number) => {
    const response = await instance.post(`/posts/${idParent}/childPosts`, data);
    return response.data;
}

export const getAllPostsFromAllAssos = async (userId: number, pageNumber: number) => {
    const response = await instance.get(`/posts?itemsPerPage=3&page=${pageNumber}&order[createdAt]=DESC&exists[parentPost]=false`);
    return response.data;
}

export const createPosts = async (data: any) => {
    const response = await instance.post(`/posts`, data);
    return response.data;
}