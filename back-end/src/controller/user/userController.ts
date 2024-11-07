import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/asyncHandler";
import { userService } from "../../services/user/user-service";

const users = catchAsync(async (req: Response, res: Response, next: NextFunction) => {
    const users = await userService.userFinding(next);
    res.status(200).json({
        totalUsers: users.length,
        datas: users
    })

})
const userById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.userById(req, next);
    res.status(200).json({
        status: 'success',
        message: 'Successfully fetched user data.',
        data: user
    })

})
const userImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const response = await userService.userImageUpload(userId, req.body.image);
    if (response === 'Image updated') {
        res.status(200).json({
            message: "Success",
            response
        })
    } else {
        res.status(404).json({
            message: "Failed",
            response
        })
    }
})
const userUpdate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    console.log(req.body);

    const response = userService.userUpdate(userId, req.body);
})

export const userController = {
    users,
    userById,
    userImage,
    userUpdate
}