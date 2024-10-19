import axios, { AxiosResponse } from 'axios';
import { IntProductList } from '../model/interfaces/product-interface';
import { CategoriesResponse } from '../model/interfaces/categories-interface';

const baseUrl: string = 'http://localhost:3000/api/users';
const adminUrl: string = 'http://localhost:3000/api/admin';

const fetchAllProducts = async (): Promise<AxiosResponse<{ datas: [IntProductList] }>> => {
    const response: Promise<AxiosResponse<{ datas: [IntProductList] }>> = axios.get(`${baseUrl}/products`);
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
    console.log(category);
    
    const response = await axios.get(`${baseUrl}/products-categories?genre=${category}`);
    return response;
}

const fetchProductBySearchKey = async (value: string): Promise<AxiosResponse<{ datas: [IntProductList] }>> => {
    const response: Promise<AxiosResponse<{ datas: [IntProductList] }>> = axios.get(`${baseUrl}/products-search?search=${value}`);
    return response
}

export const productService = {
    fetchAllProducts,
    fetchProductById,
    fetchCategories,
    fetchProductByCategories,
    fetchProductBySearchKey
}