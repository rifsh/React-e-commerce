import { Params } from "react-router-dom";
import { UserRegisrationInterface } from "./user-interface";

export interface InterfaceViewProductProps {
    productId: Params<string>
}

export interface InterfaceProductListProps {
    id?: string,
    value: string,
    cateogry?: string
}

export interface ViewProfileInterface {
    user: UserRegisrationInterface
}