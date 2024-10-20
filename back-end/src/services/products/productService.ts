import { NextFunction, Request, Response } from "express";
import { Genre, Product } from "../../models/interfaces/products_interface";
import { producModel } from "../../models/product/productsmodel";
import { CustomeError } from "../../utils/customerror";
import { ObjectId } from "mongoose";
import { Users } from "../../models/user/usermodel";
import { CartModel } from "../../models/user/cartModel";
import userCartInterface from "../../models/interfaces/user/user_cart";
import { wishListModel } from "../../models/user/wishlistModel";
import wishlistInterface from "../../models/interfaces/user/wishlist_model";
import { paymentMethod } from "../../middleware/payment";
import { genreModel } from "../../models/product/genre.model";


const addproduts = async (product: Product): Promise<Product> => {
    console.log(product);

    const createdProduct = await producModel.create(product);
    return createdProduct
}
const products = async (): Promise<Product[]> => {
    let products: Product[] = [];
    products = await producModel.find({});
    return products
}
const pagination = async (limit: number, startIndex: number) => {
    try {
        const productCount = await producModel.countDocuments();
        const products = await producModel.find().limit(limit).skip(startIndex);
        return { productCount, products }
    } catch (error) {

    }
}
const productByCategory = async (category: string, next: NextFunction) => {
    const categorizedProduts = await producModel.aggregate([{
        $match: { category: category }
    }]);
    if (categorizedProduts.length === 0) {
        next(new CustomeError(`Product not found with the category '${category}'`, 404));
    } else {
        return categorizedProduts;
    }

}
const productById = async (productId: string, next: NextFunction): Promise<Product[]> => {
    let products: Product[] = [];
    products = await producModel.findById(productId);
    if (!products) {
        next(new CustomeError(`Product not found eith given Id '${productId}'!!`, 404))
    } else {
        return products
    }
}
const updateProducts = async (id: string, prodcut: Product, next: NextFunction): Promise<string> => {
    const product = await producModel.findById(id);

    if (!product) {
        next(new CustomeError(`No such product found with id ${id}`, 404))
    } else {
        const updateProduct = await product.updateOne(prodcut);
        product.save();
        return id
    }
}
const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<Product> => {
    const id: string = req.params.id;
    const product = await producModel.findById(id);

    if (!product) {
        next(new CustomeError(`Product not found with id${id}`, 404));
    } else {
        const deletedPrdct = await producModel.findOneAndDelete({ _id: id });
        res.json({
            status: 'success',
            message: `Successfully deleted a product with id '${id}'`,
        })
    }
    return product;


}
const productByGenre = async (genre): Promise<Product[] | string> => {
    try {
        if (genre) {
            const data: Product[] = await producModel.find({ category: genre });
            return data
        } else {
            return 'No data found'
        }
    } catch (error) {
        console.log(error);
        return 'Something went wrong'
    }
}
const addToCart = async (productId: ObjectId, userId: string, res: Response, next: NextFunction) => {
    const userFinding = await Users.findById(userId);
    const product = await producModel.findById(productId);
    const existingUser = await CartModel.findOne({ userId: userId });
    const existingProduct = await CartModel.findOne({ userId: userId, products: productId });

    if (existingProduct) {
        res.status(200).json({
            status: "Success",
            message: "Product is already present in the cart"
        })
    }
    if (!product || !userFinding) {
        next(new CustomeError("Product or User not found in the db", 404));
    } else {
        if (existingUser && !existingProduct) {
            existingUser.products.push(productId);
            existingUser.totalPrice += product.price;
            await existingUser.save();
            res.status(200).json({
                status: "Success",
                message: "product is added to cart",
                cart: existingUser,
                totalProducts: existingUser.products.length
            })
        } else if (!existingUser) {
            //New user
            const addingCart = await CartModel.create({ userId: userId, products: [productId], totalPrice: product.price });
            res.status(200).json({
                status: "Success",
                message: "Your product is added to cart",
                cart: addingCart,
                totalProducts: addingCart.products.length
            })
        }

    }

}
const viewCart = async (userId: string) => {
    const viewCart = await CartModel.findOne({ userId: userId }).populate('products');
    return viewCart
}
const deleteCart = async (id: string, prdctId: ObjectId, next: NextFunction): Promise<userCartInterface> => {
    const product: Product = await producModel.findById(prdctId);
    const productFinding = await CartModel.findOne({ userId: id, products: prdctId });
    const checkUser = await CartModel.findOne({ userId: id });
    if (checkUser && productFinding) {
        const index = await checkUser.products.indexOf(prdctId);
        await checkUser.products.splice(index, 1);
        checkUser.totalPrice -= product.price;
        await checkUser.save();

        return checkUser
    }
    else if (!productFinding) {
        next(new CustomeError(`Product not found with id ${prdctId}`, 404));
    }
    else if (!checkUser) {
        next(new CustomeError(`User not found with id ${id}`, 404));
    }
}
const addToWishList = async (productId: ObjectId, userId: string, res: Response, next: NextFunction) => {
    const prodcut: Product = await producModel.findById(productId);
    const existingUser = await wishListModel.findOne({ userId: userId });
    const existingProduct = await wishListModel.findOne({ userId: userId, wishlistedproducts: productId });

    if (existingUser && !existingProduct) {
        existingUser.wishlistedproducts.push(productId);
        await existingUser.save();
        res.status(200).json({
            status: "Success",
            message: "Your product is added to Wishlist"
        })
    } else if (!existingUser) {
        //New user
        const addingCart = await wishListModel.create({ userId: userId, wishlistedproducts: [productId] });
        res.status(200).json({
            status: "Success",
            message: "Your product is added to Wishlist"
        })
    } else if (existingProduct) {
        next(new CustomeError('product is already in Wishlist', 404))
    }
}
const viewWishList = async (userId: string, res: Response, next: NextFunction) => {
    const wishlist = await wishListModel.findOne({ userId }).populate('wishlistedproducts');
    // console.log(wishlist);

    if (wishlist) {
        res.status(200).json({
            data: wishlist.wishlistedproducts
        })
    } else {
        next(new CustomeError(`User not found with id${userId}`, 404));
    }

}
const deleteWishList = async (id: string, prodcutId: ObjectId, next: NextFunction): Promise<wishlistInterface> => {
    const productFinding = await wishListModel.findOne({ userId: id, wishlistedproducts: prodcutId });
    const checkUser = await wishListModel.findOne({ userId: id });
    if (checkUser && productFinding) {
        const index = await checkUser.wishlistedproducts.indexOf(prodcutId);
        await checkUser.wishlistedproducts.splice(index, 1);
        await checkUser.save();
        return checkUser
    }
    else if (!productFinding) {
        next(new CustomeError(`Product not found with id ${prodcutId}`, 404));
    }
    else if (!checkUser) {
        next(new CustomeError(`User not found with id ${id}`, 404));
    }
}
const payment = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    const cart = await CartModel.findOne({ userId })
    paymentMethod(req, res, next);

}
const addGenre = async (genreName: string): Promise<Genre | boolean> => {
    try {
        if (genreName) {
            const addingGenre = await genreModel.create({ name: genreName });
            return addingGenre
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
const getGenres = async (): Promise<Genre[] | boolean> => {
    try {
        const data = await genreModel.find({});
        return data
    } catch (error) {
        return false
    }
}
const deleteGenreById = async (id: string): Promise<boolean> => {
    try {
        if (id) {
            const deletingGenre = await genreModel.findByIdAndDelete(id);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
const searchingProduct = async (searchText): Promise<Product[]> => {
    try {
        const product: Product[] = await producModel.find({
            $or: [
                { title: { $regex: searchText, $options: 'i' } },
                { author: { $regex: searchText, $options: 'i' } },
            ]
        })
        return product
    } catch (error) {
        console.log(error);
    }
}

export const productService = {
    addproduts,
    products,
    pagination,
    productByCategory,
    productById,
    updateProducts,
    deleteProduct,
    productByGenre,
    addToCart,
    viewCart,
    deleteCart,
    addToWishList,
    viewWishList,
    deleteWishList,
    payment,
    addGenre,
    getGenres,
    deleteGenreById,
    searchingProduct
}