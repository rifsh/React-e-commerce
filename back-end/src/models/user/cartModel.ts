import mongoose from 'mongoose';
import userCartInterface from '../interfaces/user/user_cart';
import { Users } from './usermodel';
import { producModel } from '../product/productsmodel';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:Users
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter a valid productId'],
        ref:producModel
    }],
    totalPrice: Number,
    qaunditity: {
        type: Number,
        default: 1
    }

})

export const CartModel = mongoose.model<userCartInterface>('cart', cartSchema);