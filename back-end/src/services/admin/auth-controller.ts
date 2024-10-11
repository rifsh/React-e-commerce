import { Request, Response, NextFunction } from "express";
import path from "path";
import { adminToken } from '../../utils/token'
import dotenv from "dotenv";
import { CustomeError } from "../../utils/customerror";
import { Users } from "../../models/user/usermodel";
import { producModel } from "../../models/product/productsmodel";
import { adminModel } from "../../models/admin/login";
import { Product } from "../../models/interfaces/products_interface";
import { userInterface } from "../../models/interfaces/user/user_model";


dotenv.config({ path: path.join(__dirname, '../../../../config.env') });


const login = async (req: Request, next: NextFunction):Promise<string> => {
    const reqAdminName = req.body.username;
    const reqAdminPassword = req.body.password;
    const adminName = process.env.ADMIN_USRNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const validation: boolean = reqAdminName === adminName && reqAdminPassword === adminPassword;
    if (!validation) {
        next(new CustomeError('User name or password is incorrecct', 404))
    } else {
        await adminModel.create({ adminName: reqAdminName, adminPassword: reqAdminPassword });
        const tokens = adminToken(adminName);
        return tokens
    }
}
const userFinding = async (next: NextFunction):Promise<userInterface[]> => {
    const users = await Users.find();
    if (!users || users.length === 0) {
        next(new CustomeError("Users not found in the data base!!!", 404));
    } else {
        return users;
    }
}
const userById = async (req: Request, next: NextFunction):Promise<userInterface> => {
    const usrId = req.params.id;
    const users = await Users.findById(usrId);
    if (!users) {
        next(new CustomeError(`User is not present in the database with id '${usrId}' `, 404));
    } else {
        return users;
    }
}

export const admin_srvc = {
    login,
    token: adminToken,
    userFinding,
    userById,

}