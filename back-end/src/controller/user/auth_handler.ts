import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path'
import catchAsync from '../../utils/asyncHandler';
import { userSrvc } from '../../services/user/user-service';
import { userToken } from '../../utils/token';
import { Usersignup } from '../../models/interfaces/user/userSignup';
import { Users } from '../../models/user/usermodel';

dotenv.config({ path: path.join(__dirname, '../../config.env') });

const signUp = catchAsync(async (req: Request, res: Response) => {
    const userDatas: Usersignup = req.body;
    const users = await userSrvc.signUp(userDatas);
    // const token = userToken();
    res.status(200).json({
        status: "Success",
        // token,
        data: {
            users
        }
    })

})
const logIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userName: string = req.body.username;
    const password: string = req.body.password;
    const userDetails = await Users.findOne({ usrname: userName });
    const logedValue = await userSrvc.logIn(userName, password, next);
    res.status(200).json({
        status: "Valid",
        token: logedValue,
        user: userDetails
    })

})






export const userControllers = {
    signUp,
    logIn,
} 