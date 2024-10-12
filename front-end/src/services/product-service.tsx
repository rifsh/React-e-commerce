import axios, { AxiosResponse } from 'axios';
import { IntProductList } from '../model/interfaces/product-interface';

const baseUrl: string = 'http://localhost:3000/api/users';

const fetchAllProducts = async (): Promise<AxiosResponse<{ datas: [IntProductList] }>> => {
    const response: Promise<AxiosResponse<{ datas: [IntProductList] }>> = axios.get(`${baseUrl}/products`);
    return response;
}

const fetchProductById = async (productId) => {
    const response = await axios.get(`${baseUrl}/http://localhost:3000/api/users/products_Id/${productId}`);
    return response
}

export const productService = {
    fetchAllProducts,
    fetchProductById
}