import { Types } from "mongoose";
import { Address } from "./user";

export interface OrderInterface extends Document {
    userId: Types.ObjectId;
    books: Types.ObjectId[];
    totalPrice: number;
    shippingAddress: Address;
    paymentStatus: 'pending' | 'paid' | 'failed';
    orderStatus: 'pending' | 'shipped' | 'delivered' | 'canceled';
    paymentMethod: 'credit-card' | 'paypal' | 'bank-transfer';
    placedAt: Date;
    shippedAt?: Date;
    deliveredAt?: Date;
    updatedAt: Date;
    createdAt: Date;
}