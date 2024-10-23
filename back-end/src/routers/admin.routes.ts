import exp from 'express';
import { adminController } from '../controller/admin/auth-handler';
import { imgUpload } from '../middleware/imageUpload';
import { adminRouteProtecter } from '../middleware/routeProtector';
import { productController } from '../controller/Product/productController';



export const adminRouter = exp.Router();
//admin_router
adminRouter.post('/login', adminController.login)
    .get('/get-all-genres', productController.getGenre)
    .use(adminRouteProtecter)
    .get('/users', adminController.users)
    .get('/user/:id', adminController.userById)
    .get('/products', productController.viewProduct)
    .get('/productbyid/:id', productController.productById)
    .post('/addproducts', imgUpload, productController.addProduct)
    .post('/add-genre', productController.addGenre)
    .delete('/delete-genres/:id', productController.deleteGenreById)
    .patch('/updateproduct/:id', imgUpload, productController.updateProduct)
    .delete('/deleteproduct/:id', productController.deleteProduct)
