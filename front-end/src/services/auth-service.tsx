import axios, { AxiosResponse } from "axios"
import { UserLoginInterface, UserRegisrationInterface } from "../model/interfaces/user-interface";
import { Bounce, toast } from "react-toastify";
const baseUrl = 'http://localhost:3000/api/users';

const userRegistration = async (regData: UserRegisrationInterface): Promise<AxiosResponse<{ status: string }>> => {
    try {
        console.log(regData.image);
        const formData = new FormData();
        formData.append('name', regData.name);
        formData.append('userName', regData.userName);
        formData.append('email', regData.email);
        formData.append('profileImg', regData.image);
        formData.append('password', regData.password);
        formData.append('confirmPassword', regData.confirmPassword);
        const response: AxiosResponse<{ status: string }> = await axios.post(`${baseUrl}/signup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        toast.warning('Something went wrong', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
}
const userLogin = async (loginData: UserLoginInterface): Promise<AxiosResponse<{ status: string, token: string, user: UserRegisrationInterface }>> => {
    try {
        const response: AxiosResponse<{ status: string, token: string, user: UserRegisrationInterface }> = await axios.post(`${baseUrl}/login`, loginData);
        return response
    } catch (error) {
        return error
    }
}

export const authService = {
    userLogin,
    userRegistration
}