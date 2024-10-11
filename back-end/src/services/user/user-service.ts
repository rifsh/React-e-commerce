import { NextFunction, } from "express";
import { Users } from "../../models/user/usermodel";
import { userToken } from "../../utils/token";
import { CustomeError } from "../../utils/customerror";
import { Usersignup } from "../../models/interfaces/user/userSignup";
import { userInterface } from "../../models/interfaces/user/user_model";


//JWT_token

const signUp = async (userDatas: Usersignup) => {
    const newUser:userInterface = await Users.create(userDatas);
    return newUser
}

const logIn = async (usrname: string, password: string, next: NextFunction): Promise<string> => {
    if (!usrname || !password) {
        const err = new CustomeError(`Please provide a Username and password`, 404);
        next(err);
    }
    const logedUser = await Users.findOne({ usrname }).select('+password');


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