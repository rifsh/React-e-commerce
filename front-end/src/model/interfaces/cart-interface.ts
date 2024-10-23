import { IntProductList } from "./product-interface"

export interface InterfaceCartResponse {
    products: IntProductList[];
    qaunditity: number,
    totalPrice: number
}

export interface InterfaceCartUseState {
    loading: boolean,
    value?: string | null
}