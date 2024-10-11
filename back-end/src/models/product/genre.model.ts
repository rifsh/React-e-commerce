import mongoose from "mongoose";
import { Genre } from "../interfaces/products_interface";

const schema = new mongoose.Schema<Genre>({
    name: {
        type: String,
        required: [true, 'Genre name is required'],
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date().getDate(),
        select: false
    }
});


export const genreModel = mongoose.model<Genre>('genre', schema);