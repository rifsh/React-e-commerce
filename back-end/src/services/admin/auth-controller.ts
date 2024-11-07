import { Request, Response, NextFunction } from "express";
import path from "path";
import { adminToken } from '../../utils/token'
import dotenv from "dotenv";
import { CustomeError } from "../../utils/customerror";
import { Users } from "../../models/schemas/user/usermodel";
import { producModel } from "../../models/schemas/product/productsmodel";
import { adminModel } from "../../models/schemas/admin/login";
import { Product } from "../../models/interfaces/products_interface";
import { userInterface } from "../../models/interfaces/user/user";


dotenv.config({ path: path.join(__dirname, '../../../../config.env') });


const login = async (req: Request, next: NextFunction): Promise<string> => {
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


export const admin_srvc = {
    login,
    token: adminToken,
}