import axios, { AxiosResponse } from "axios"
import { UserRegisrationInterface } from "../model/interfaces/user-interface";

const baseUrl: string = 'http://localhost:3000/api/users';
const userId: string = localStorage.getItem('userId');
const token: string = localStorage.getItem('token');

const fetchUserById = async (id:string): Promise<AxiosResponse<{ data: UserRegisrationInterface }>> => {
    const resposne: Promise<AxiosResponse<{ data: UserRegisrationInterface }>> = axios.get(`${baseUrl}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return resposne;
}

export const userService = {
    fetchUserById,
}