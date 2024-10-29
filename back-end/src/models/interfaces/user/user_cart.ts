import mongoose, { Types } from "mongoose";

interface userCartInterface {
    userId: mongoose.Schema.Types.ObjectId,
    cartProducts: [
        {
            productId: Types.ObjectId,
        },
        {
            quandity: number
        },
        
    ],
    totalPrice: number
}

export default userCartInterface