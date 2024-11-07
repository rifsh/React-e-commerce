import mongoose, { Types } from 'mongoose';
import userCartInterface from '../../interfaces/user/userCart';
import { Users } from './usermodel';
import { producModel } from '../product/productsmodel';

const cartSchema = new mongoose.Schema<userCartInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    },
    cartProducts: [{
        productId: {
            type: Types.ObjectId,
            required: [true, 'Please enter a valid productId'],
            ref: producModel
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalPrice: {
        type: Number
    }
})

export const CartModel = mongoose.model<userCartInterface>('cart', cartSchema);