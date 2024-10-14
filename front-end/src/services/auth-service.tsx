import axios, { AxiosResponse } from "axios"
import { UserLoginInterface, UserRegisrationInterface } from "../model/interfaces/user-interface";
const baseUrl = 'http://localhost:3000/api/users';

const userRegistration = async (regData: UserRegisrationInterface) => {
    try {
        console.log(regData.image);
        const formData = new FormData();
        formData.append('name', regData.name);
        formData.append('userName', regData.userName);
        formData.append('email', regData.email);
        formData.append('profileImg', regData.image);
        formData.append('password', regData.password);
        formData.append('confirmPassword', regData.confirmPassword);
        const response = await axios.post(`${baseUrl}/signup`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        return response;
    } catch (error) {
        throw error
    }
}
const userLogin = async (loginData: UserLoginInterface): Promise<AxiosResponse> => {
    try {
        const response = await axios.post(`${baseUrl}/login`, loginData);
        return response;
    } catch (error) {
        throw error
    }
}

export const authService = {
    userLogin,
    userRegistration
}