import mongoose from 'mongoose';
import wishlistInterface from '../../interfaces/user/wishlist';
import { producModel } from '../product/productsmodel';

const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    wishlistedproducts: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter a valid productId'],
        ref:producModel,
    }],
    totalPrice: Number

})

export const wishListModel = mongoose.model<wishlistInterface>('wishlist', wishListSchema);