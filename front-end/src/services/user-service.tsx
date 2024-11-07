import { AxiosResponse } from "axios"
import { UserInterface, UserRegistrationInterface } from "../model/interfaces/user-interface";
import userApi from "../utils/axios";
import { InterfaceCartResponse } from "../model/interfaces/cart-interface";

const baseUrl: string = 'http://localhost:3000/api/users';

// console.log(regData.image);
//         const formData = new FormData();
//         formData.append('name', regData.name);
//         formData.append('userName', regData.userName);
//         formData.append('email', regData.email);
//         formData.append('profileImg', regData.image);
//         formData.append('password', regData.password);
//         formData.append('confirmPassword', regData.confirmPassword);
//         const response: AxiosResponse<{ status: string }> = await axios.post(`${baseUrl}/signup`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },

const fetchUserById = async (id: string): Promise<AxiosResponse<{ data: UserInterface }>> => {
    const resposne: Promise<AxiosResponse<{ data: UserInterface }>> = userApi.get(`${baseUrl}/user/${id}`);
    return resposne;
}

const fetchCartProducts = async (userId: string): Promise<AxiosResponse<{ datas: InterfaceCartResponse }>> => {
    const respons = await userApi.get(`${baseUrl}/${userId}/cart`);
    return respons;
}

const deleteProductFromCart = async (Id: string, userId: string): Promise<AxiosResponse<{ message: string }>> => {
    const productId = { productId: Id }
    const resposne = await userApi.post(`${baseUrl}/${userId}/deletecart`, productId);
    return resposne;
}

const updateUser = async (userId: string, data: FormData): Promise<AxiosResponse<{ message: string, response: string }>> => {
    const response: AxiosResponse<{ message: string, response: string }> = await userApi.patch(`${baseUrl}/userProfileImage/${userId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
}

export const userService = {
    fetchUserById,
    fetchCartProducts,
    deleteProductFromCart,
    updateUser
}