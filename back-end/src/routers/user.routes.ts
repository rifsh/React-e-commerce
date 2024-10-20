import exp from 'express';
import { userControllers } from '../controller/user/auth_handler';
import { userRouteProtecter } from '../middleware/routeProtector';
import { userImgUpload } from '../middleware/imageUpload';
import { adminController } from '../controller/admin/auth-handler';
import { productController } from '../controller/Product/productController';



export const userRouter = exp.Router();
//user_router
userRouter.post('/signup', userImgUpload, (userControllers.signUp))
    .post('/login', userControllers.logIn)
    .get('/success', productController.succes)
    .get('/cancel', productController.cancel)
    .use(userRouteProtecter)
    .get('/user/:id', adminController.userById)
    .get('/:id/increment', productController.qundityIncre)
    .post('/:id/cart', productController.addToCart)
    .get('/:id/cart', productController.viewCart)
    .post('/:id/deletecart', productController.deleteCartItems)
    .post('/:id/wishlist', productController.addWishList)
    .get('/:id/wishlist', productController.viewWishlist)
    .post('/:id/deletewishlist', productController.deleteWishlistprdct)
    .get('/:id/payment', productController.userPayment)
