import axios, { AxiosResponse } from 'axios';
import { IntProductList } from '../model/interfaces/product-interface';
import { CategoriesResponse } from '../model/interfaces/categories-interface';
import userApi from '../utils/axios';
import { Bounce, toast } from 'react-toastify';

const baseUrl: string = 'http://localhost:3000/api/products';
const adminUrl: string = 'http://localhost:3000/api/admin';
const userUrl: string = 'http://localhost:3000/api/users';

const fetchAllProducts = async (): Promise<AxiosResponse<{ datas: [IntProductList] }>> => {
    const response: Promise<AxiosResponse<{ datas: [IntProductList] }>> = axios.get(`${baseUrl}/products`);
    return response;
}

const fetchProductsByPagination = async (page: number): Promise<AxiosResponse<{ products: IntProductList[], totalPages: number }>> => {
    const response: Promise<AxiosResponse<{ products: [IntProductList], totalPages: number }>> = axios.get(`${baseUrl}/products-pagination?page=${page}&limit=${10}`);
    return response;
}

const fetchProductById = async (productId: string): Promise<AxiosResponse<{ datas: IntProductList }>> => {
    const response: AxiosResponse<{ datas: IntProductList }> = await axios.get(`${baseUrl}/products_Id/${productId}`);
    return response
}

const fetchCategories = async (): Promise<AxiosResponse<{ data: CategoriesResponse[] }>> => {
    const response = await axios.get(`${adminUrl}/get-all-genres`);
    return response;
}

const fetchProductByCategories = async (category: string): Promise<AxiosResponse<{ datas: IntProductList[] }>> => {
    const response = await axios.get(`${baseUrl}/products-categories?genre=${category}`);
    return response;
}

const fetchProductBySearchKey = async (value: string): Promise<AxiosResponse<{ datas: [IntProductList] }>> => {
    const response: Promise<AxiosResponse<{ datas: [IntProductList] }>> = axios.get(`${baseUrl}/products-search?search=${value}`);
    return response
}

const addToCart = async (productId: string, id: string): Promise<boolean> => {
    const userId = { userId: id };
    try {
        const cart: AxiosResponse<{ message: string }> = await userApi.post(`${userUrl}/${productId}/cart`, userId);
        if (cart.data?.message === 'Product is already present in the cart') {
            toast.warn(cart.data?.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return false;
        } else {
            toast.success(cart.data?.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return false;
        }
    } catch (error) {

    }
}

export const productService = {
    fetchAllProducts,
    fetchProductsByPagination,
    fetchProductById,
    fetchCategories,
    fetchProductByCategories,
    fetchProductBySearchKey,
    addToCart
}