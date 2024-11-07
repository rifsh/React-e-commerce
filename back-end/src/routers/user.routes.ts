import exp from 'express';
import { userControllers } from '../controller/user/auth_handler';
import { userRouteProtecter } from '../middleware/routeProtector';
import { userImgUpload } from '../middleware/imageUpload';
import { productController } from '../controller/Product/productController';
import { userController } from '../controller/user/userController';



export const userRouter = exp.Router();
//user_router
userRouter.post('/signup', userControllers.signUp)
    .post('/login', userControllers.logIn)
    .get('/success', productController.succes)
    .get('/cancel', productController.cancel)
    .use(userRouteProtecter)
    .get('/user/:id', userController.userById)
    .patch('/user/:id', userController.userUpdate)
    .patch('/userProfileImage/:id', userImgUpload, userController.userImage)
    .post('/:id/quantity', productController.qundityHandling)
    .post('/:id/cart', productController.addToCart)
    .get('/:id/cart', productController.viewCart)
    .post('/:id/deletecart', productController.deleteCartItems)
    .post('/:id/wishlist', productController.addWishList)
    .get('/:id/wishlist', productController.viewWishlist)
    .post('/:id/deletewishlist', productController.deleteWishlistprdct)
    .post('/add-order/:productId/:userId', productController.addToOrder)
    .get('/:id/payment', productController.userPayment)
