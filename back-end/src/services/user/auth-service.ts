import { NextFunction, } from "express";
import { Users } from "../../models/schemas/user/usermodel";
import { userToken } from "../../utils/token";
import { CustomeError } from "../../utils/customerror";
import { Usersignup } from "../../models/interfaces/user/userSignup";
import { userInterface } from "../../models/interfaces/user/user";

const signUp = async (userData: Usersignup): Promise<string> => {
    try {
        const newUser: userInterface = await Users.create(userData);
        return 'Account created successfully'
    } catch (error) {
        console.log(error.message);
        return 'Somthing went wrong'
    }
}

const logIn = async (usrname: string, password: string, next: NextFunction): Promise<string> => {
    if (!usrname || !password) {
        const err = new CustomeError(`Please provide a Username and password`, 404);
        next(err);
    }
    const logedUser = await Users.findOne({ userName: usrname }).select('+password');


    if (!logedUser || !await logedUser.comparePassword(password, logedUser.password)) {
        const error = new CustomeError('Incorrect username or password', 404);
        next(error);
    }
    const token = userToken(logedUser._id);
    return token

}

export const userSrvc = {
    signUp,
    logIn,
}