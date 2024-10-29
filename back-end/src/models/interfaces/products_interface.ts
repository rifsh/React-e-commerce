import mongoose from "mongoose";

export interface Product {
    _id: mongoose.Types.ObjectId,
    title: string,
    image: string,
    description: string,
    price: number,
    category: string,
    author: string
}

export interface Genre {
    name: string,
    createdAt: Date
}

export interface PaginatedProducts {
    products: Product[];
    hasMore: boolean;
}