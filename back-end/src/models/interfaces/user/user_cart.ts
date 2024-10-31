import mongoose, { Types } from "mongoose";

interface userCartInterface {
    userId: mongoose.Schema.Types.ObjectId,
    cartProducts: [
        {
            productId: Types.ObjectId,
            quantity: number
        },
        
    ],
    totalPrice: number
}

export default userCartInterface