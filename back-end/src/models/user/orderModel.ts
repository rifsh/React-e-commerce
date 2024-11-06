import mongoose, { Schema, Types } from "mongoose";
import { OrderInterface } from "../interfaces/user/userOrder";
import { Users } from "./usermodel";
import { producModel } from "../product/productsmodel";

const orderSchema = new mongoose.Schema<OrderInterface>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    books: {
        type: [Schema.Types.ObjectId],
        ref: producModel
    },
    totalPrice: {
        type: Number
    },
    shippingAddress: {
        state: {
            types: String,
        },
        city: {
            types: String,
            // required: true
        },
        street: {
            types: String,
        },
        pinCode: {
            types: Number,
        },
    }

})

export const orderModel = mongoose.model('Order', orderSchema);