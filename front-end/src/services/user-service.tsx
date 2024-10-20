import { AxiosResponse } from "axios"
import { UserRegisrationInterface } from "../model/interfaces/user-interface";
import userApi from "../utils/axios";

const baseUrl: string = 'http://localhost:3000/api/users';

const fetchUserById = async (id:string): Promise<AxiosResponse<{ data: UserRegisrationInterface }>> => {
    const resposne: Promise<AxiosResponse<{ data: UserRegisrationInterface }>> = userApi.get(`${baseUrl}/user/${id}`);
    return resposne;
}

export const userService = {
    fetchUserById,
}