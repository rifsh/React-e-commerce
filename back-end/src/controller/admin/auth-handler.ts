import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/asyncHandler";
import { admin_srvc } from "../../services/admin/auth-controller";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const response = await admin_srvc.login(req, next);

    res.status(200).json({
        status: "Success",
        name: process.env.ADMIN_USRNAME,
        message: "Sir you are successfully logged in",
        token: response
    })
})



export const adminController = {
    login,
}