import express, { Router } from "express";
import { productController } from "../controller/Product/productController";

export const productRoutes: Router = express.Router();

productRoutes.get('/products', productController.viewProduct)
    .get('/products_Id/:id', productController.productById)
    .get('/products-categories', productController.productByCatogory)
    .get('/products-search', productController.search)
    .get('/products-pagination', productController.viewProdcutByPages)