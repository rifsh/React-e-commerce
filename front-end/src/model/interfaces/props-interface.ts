import { Params } from "react-router-dom";

export interface InterfaceViewProductProps {
    productId: Params<string>
}

export interface InterfaceProductListProps {
    value: string,
    cateogry?: string
}