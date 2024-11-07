import { NextFunction, Request } from "express";
import { userInterface } from "../../models/interfaces/user/user";
import { Users } from "../../models/schemas/user/usermodel";
import { CustomeError } from "../../utils/customerror";

const userFinding = async (next: NextFunction): Promise<userInterface[]> => {
    const users = await Users.find();
    if (!users || users.length === 0) {
        next(new CustomeError("Users not found in the data base!!!", 404));
    } else {
        return users;
    }
}
const userById = async (req: Request, next: NextFunction): Promise<userInterface> => {
    const usrId = req.params.id;
    const users = await Users.findById(usrId);
    if (!users) {
        next(new CustomeError(`User is not present in the database with id '${usrId}' `, 404));
    } else {
        return users;
    }
}
const userImageUpload = async (userId: string, image: string): Promise<string> => {
    try {
        const userFinding = await Users.findById(userId);
        if (userFinding) {
            const imageUpdating = await Users.findByIdAndUpdate(userId, { $set: { image } });
            return 'Image updated'
        }
        return 'User not found'
    } catch (error) {
        return error
    }
}
const userUpdate = async (userId: string, data) => {
    try {
        console.log(userId);

    } catch (error) {

    }
}

export const userService = {
    userFinding,
    userById,
    userImageUpload,
    userUpdate
}