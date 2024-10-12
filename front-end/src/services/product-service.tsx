import axios, { AxiosResponse } from 'axios';
import { IntProductList } from '../model/interfaces/product-interface';

const baseUrl: string = 'http://localhost:3000/api/users';

const fetchAllProducts = async () => {
    const response: Promise<AxiosResponse<{datas: [IntProductList]}>> = axios.get(`${baseUrl}/products`);
    return response;
}

export const productService = {
    fetchAllProducts
}