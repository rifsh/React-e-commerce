import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/asyncHandler";
import { admin_srvc } from "../../services/admin/auth-controller";
import { Product } from "../../models/interfaces/products_interface";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await admin_srvc.login(req, next);

    res.status(200).json({
        status: "Success",
        name: process.env.ADMIN_USRNAME,
        message: "Sir you are successfully logged in",
        token: response
    })
})
const users = catchAsync(async (req: Response, res: Response, next: NextFunction) => {
    const users = await admin_srvc.userFinding(next);
    res.status(200).json({
        totalUsers: users.length,
        datas: users
    })

})
const userById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await admin_srvc.userById(req, next);
    console.log(user);
    
    res.status(200).json({
        status: 'success',
        message: 'Successfully fetched user data.',
        data: user
    })

})


export const adminController = {
    login,
    users,
    userById,
}