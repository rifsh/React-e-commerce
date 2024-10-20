import mongoose from 'mongoose';
import path from 'path'
import * as dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname,'../.env')});


export function connection() {
    mongoose.connect(process.env.DATABASE_UR, {
        dbName:'books-shopee'
    })
        .then((conn) => {
            console.log('connected successfully');
            
        }).catch((err) => {
            console.log(err.message);

        })
}