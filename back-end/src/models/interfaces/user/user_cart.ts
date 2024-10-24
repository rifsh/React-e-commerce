import mongoose, { Types } from "mongoose";

interface userCartInterface {
    userId: mongoose.Schema.Types.ObjectId,
    cartProducts: [
        {
            productId: Types.ObjectId,
        },
        {
            qaunditity: number
        },
        
    ],
    totalPrice: number
}

export default userCartInterface