import exp, { Express, NextFunction, Request, Response } from 'express';
import cors from "cors";
import bodyparser from "body-parser";
import { userRouter } from './routers/user.routes';
import { adminRouter } from './routers/admin.routes';
import { CustomeError } from './utils/customerror';
import { productRoutes } from './routers/product.routes';




const app: Express = exp();
app.use(bodyparser.json())
app.use(exp.json());
app.use(cors())


app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRouter);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomeError(`Can't find url '${req.originalUrl}' on the server!`, 404);
    next(err);
})


export default app;
