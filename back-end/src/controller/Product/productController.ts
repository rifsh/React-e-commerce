import { NextFunction, Request, Response } from "express";
import { productService } from "../../services/products/productService";
import catchAsync from "../../utils/asyncHandler";
import { orderModel } from "../../models/user/orderModel";
import { CustomeError } from "../../utils/customerror";
import { ObjectId } from "mongoose";
import { CartModel } from "../../models/user/cartModel";
import { Genre, Product } from "../../models/interfaces/products_interface";

const addProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product: Product = req.body;
    console.log(product);

    const products = await productService.addproduts(product);
    res.status(201).json({
        status: 'success',
        message: 'Successfully created a product.',
        products: products
    })
})
const viewProduct = catchAsync(async (req: Request, res: Response) => {
    const products = await productService.products();
    res.status(200).json({
        status: "OK",
        total_Products: products.length,
        datas: products
    })    
})
const categorizedProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category: string = req.params.id
    console.log(category);

    const products = await productService.productByCategory(category, next);
    res.status(200).json({
        totalPrdoucts: products.length,
        datas: products
    })

})
const productById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productID: string = req.params.id;
    const products = await productService.productById(productID, next);
    res.status(200).json({
        id: productID,
        datas: products
    })
})
const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const products: Product = req.body;
    const prdctId: string = req.params.id;
    const id = await productService.updateProducts(prdctId, products, next);
    res.json({
        status: 'success',
        message: `Successfully updated a product with id '${id}'`,
    })
})
const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await productService.deleteProduct(req, res, next)
})
const addGenre = catchAsync(async (req: Request, res: Response) => {
    const genreName: string = req.body.genreName;
    const data = await productService.addGenre(genreName);
    if (data) {
        res.status(201).json({
            message: "Success",
            data
        })
    } else {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})
const getGenre = catchAsync(async (req: Request, res: Response) => {
    const data: boolean | Genre[] = await productService.getGenres();
    if (data) {
        res.status(201).json({
            message: "Success",
            data
        })
    } else {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})
const deleteGenreById = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const data: boolean = await productService.deleteGenreById(id);
    if (data) {
        res.status(201).json({
            message: "Successfullt deleted",
        })
    } else {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})
const productByCatogory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const genre = req.query.genre;
    const datas: Product[] | string = await productService.productByGenre(genre)
    if (datas) {
        res.status(200).json({
            message: 'Successfully fetched',
            datas,
            totalProducts: datas.length
        })
    } else if (datas.length === 0) {
        res.status(204).json({
            message: 'No data',
        })
    }
    else if (datas === 'Something went wrong') {
        res.status(404).json({
            message: datas,
        })
    }
})
const qundityIncre = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await CartModel.findOne({ userId: req.params.id })
    // const product = await producModel.findById(req.body.prdctID);
    console.log(cart);

})
const addToCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productId: ObjectId = req.body.productId;
    const userId: string = req.params.id;
    productService.addToCart(productId, userId, res, next)
})
const viewCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let totalPrice: number = 0;
    const userId: string = req.params.id;
    const carts = await productService.viewCart(userId);
    // carts.map((x) => { return totalPrice += x.price });

    if (carts) {
        res.status(200).json({
            // totalProducts: carts.length,
            datas: carts,
            totalPrice
        })
    } else {
        next(new CustomeError("Cart is not found", 404));
    }
})
const deleteCartItems = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const prodcutId: ObjectId = req.body.productId;
    const deletedProduct = await productService.deleteCart(id, prodcutId, next);
    if (deletedProduct) {
        res.status(200).json({
            status: "OK",
            message: "Removed successfully",

        })
    } else {
        next(new CustomeError("Something went wrong", 401));
    }
})
const addWishList = catchAsync(async (req: Request, res: Response, next) => {
    const productId: ObjectId = req.body.productId;
    const userId: string = req.params.id;
    productService.addToWishList(productId, userId, res, next)
})
const viewWishlist = catchAsync(async (req: Request, res: Response, next) => {
    const userId: string = req.params.id;
    productService.viewWishList(userId, res, next)
})
const deleteWishlistprdct = catchAsync(async (req: Request, res: Response, next) => {
    const id: string = req.params.id;
    const prodcutId: ObjectId = req.body.productId;
    const deleted = await productService.deleteWishList(id, prodcutId, next);
    if (deleted) {
        res.status(200).json({
            Message: "Delted successfully"
        })
    } else {
        next(new CustomeError("Something send wrong", 401));
    }
})
const userPayment = catchAsync(async (req: Request, res: Response, next) => {
    const payment = await productService.payment(req, res, next);
})
const succes = catchAsync(async (req: Request, res: Response, next) => {
    res.send("Success");
})
const cancel = catchAsync(async (req: Request, res: Response, next) => {
    res.send("Denied");
})
const deleteall = catchAsync(async (req: Request, res: Response, next) => {
    await orderModel.deleteMany();
})
const search = catchAsync(async (req: Request, res: Response) => { 
    const query = req.query.search;
    const datas: Product[] = await productService.searchingProduct(query);
    res.status(200).json({
        datas
    })
})


export const productController = {
    addProduct,
    viewProduct,
    categorizedProducts,
    productById,
    updateProduct,
    deleteProduct,
    addGenre,
    getGenre,
    deleteGenreById,
    productByCatogory,
    qundityIncre,
    addToCart,
    viewCart,
    deleteCartItems,
    addWishList,
    viewWishlist,
    deleteWishlistprdct,
    userPayment,
    succes,
    cancel,
    deleteall,
    search
}