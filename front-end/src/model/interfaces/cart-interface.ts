import { IntProductList } from "./product-interface"

export interface InterfaceCartResponse {
    cartProducts: [{
        productId: IntProductList[],
        qaunditity: number
        _id: string

    }];
    qaunditity: number,
    totalPrice: number
}

export interface CartProductInterface {
    _id: string
    title: string,
    image: string,
    category: string,
    author: string
    price: number,
    quantity: number,
}

export interface InterfaceCartUseState {
    loading: boolean,
    value?: string | null
}