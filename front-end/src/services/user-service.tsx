import { AxiosResponse } from "axios"
import { UserRegisrationInterface } from "../model/interfaces/user-interface";
import userApi from "../utils/axios";
import { InterfaceCartResponse } from "../model/interfaces/cart-interface";

const baseUrl: string = 'http://localhost:3000/api/users';

const fetchUserById = async (id: string): Promise<AxiosResponse<{ data: UserRegisrationInterface }>> => {
    const resposne: Promise<AxiosResponse<{ data: UserRegisrationInterface }>> = userApi.get(`${baseUrl}/user/${id}`);
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

export const userService = {
    fetchUserById,
    fetchCartProducts,
    deleteProductFromCart
}