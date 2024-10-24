import { IntProductList } from "./product-interface"

export interface InterfaceCartResponse {
    cartProducts: [{
        productId: IntProductList[],
        quandity: number
    }];
    qaunditity: number,
    totalPrice: number
}

export interface InterfaceCartUseState {
    loading: boolean,
    value?: string | null
}