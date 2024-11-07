import axios, { AxiosResponse } from "axios"
import { UserLoginInterface, UserInterface, UserRegistrationInterface } from "../model/interfaces/user-interface";
import { Bounce, toast } from "react-toastify";
const baseUrl = 'http://localhost:3000/api/users';

const userRegistration = async (regData: UserRegistrationInterface): Promise<AxiosResponse<{ status: string }>> => {
    try {
        // console.log(regData);
        
        const response: AxiosResponse<{ status: string }> = await axios.post(`${baseUrl}/signup`, regData, {
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
const userLogin = async (loginData: UserLoginInterface): Promise<AxiosResponse<{ status: string, token: string, user: UserInterface }>> => {
    try {
        const response: AxiosResponse<{ status: string, token: string, user: UserInterface }> = await axios.post(`${baseUrl}/login`, loginData);
        return response
    } catch (error) {
        return error
    }
}

export const authService = {
    userLogin,
    userRegistration
}