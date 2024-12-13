import mongoose from 'mongoose';
import validator from 'validator';
import bcrpt from 'bcryptjs';
import { userInterface } from '../../interfaces/user/user';

const userSchema = new mongoose.Schema<userInterface>({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 're enter your password'],
        //only work for save and create
        validate: {
            validator: function (val: string): boolean {
                return val === this.password
            },
            message: 'Password and confirm password is not same'
        }
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    image: {
        type: String,
    },
    address: [
        {
            state: { type: String },
            city: { type: String },
            street: { type: String },
            pinCode: { type: Number }
        }, {
            required: false
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    cretedOn: {
        type: Date,
        default: new Date().getDate(),
        select: false
    }

})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    //password encrypting

    this.password = await bcrpt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();

})

userSchema.methods.comparePassword = async function (candidatePassword: string, dbpswrd: string): Promise<boolean> {
    return bcrpt.compare(candidatePassword, dbpswrd); // Compare candidate password with stored hash
};

export const Users = mongoose.model<userInterface>('userDetail', userSchema);

