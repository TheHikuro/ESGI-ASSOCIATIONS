import axios from "axios";
import moment from "moment";
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
    const response = await instance.put(`/associations/${assosId}/remove_member/${memberId}`);
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

export const getCommentsPosts = async () => {
    const response = await instance.get(`/comments`);
    return response.data;
}

export const createChildPosts = async (data: any) => {
    const response = await instance.post(`/comments`, data);
    return response.data;
}

export const getAllPostsFromAllAssos = async (pageNumber: number) => {
    const response = await instance.get(`/posts?itemsPerPage=3&page=${pageNumber}&order[createdAt]=DESC`);
    return response.data;
}

export const createPosts = async (data: any) => {
    const response = await instance.post(`/posts`, data);
    return response.data;
}

export const getCommentsFromPost = async (postId: number) => {
    const response = await instance.get(`/posts/${postId}/comments`);
    return response.data;
}

export const getAllEvent = async (idMember: number) => {
    const response = await instance.get(`/events?page=1&itemsPerPage=30&active=true&archived=false&association.members.id=${idMember}`);
    return response.data;
}

export const joinEvent = async (idEvent: number, idMember: number) => {
    const response = await instance.put(`/events/${idEvent}/add_participant/${idMember}`);
    return response.data;
}

export const exctratPresence = async (data: { format: string }) => {
    const response = await instance.post(`/associations/extract_presences`, data, {
        responseType: 'blob'
    });
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Presences OPEN ${moment(new Date()).format('l')}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
}

export const createAssos = async (data: AssosDetails, id: number) => {
    const postData = {
        ...data,
        owner: `/api/users/${id.toString()}}`
    }
    const response = await instance.post('/associations', postData);
    return response.data;
}

export const joinAssos = async (idAssos: number, idMember: number) => {
    const response = await instance.put(`/associations/${idAssos}/add_member/${idMember}`);
    return response.data;
}

export const createEvent = async (data: any) => {
    const response = await instance.post(`/events`, data);
    return response.data;
}

export const getAllEventFromAssos = async (idAssos: number) => {
    const response = await instance.get(`/associations/${idAssos}/events`);
    return response.data;
}

export const ChangeEventStatus = async (idEvent: number, data: any) => {
    const response = await instance.put(`/events/${idEvent}`, data);
    return response.data;
}
