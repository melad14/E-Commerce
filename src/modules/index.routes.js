import { globalErr } from "../middleware/globalErr.js"
import { AppError } from "../utils/AppErr.js"
import authRouter from "./auth/auth.router.js"
import brandRouter from "./brand/brand.router.js"
import categoryRouter from "./category/category.router.js"
import productRouter from "./product/products.router.js"
import reviewRouter from "./review/review.router.js"
import subcategoryRouter from "./subcategory/subcategory.router.js"
import userRouter from "./users/user.router.js"
import couponRouter from './coupon/coupon.router.js';
import cartRouter from "./cart/cart.router.js"
import wishRouter from "./wishlist/wishlist.router.js"
import adressRouter from "./adresses/adress.router.js"
import orderRouter from "./order/order.router.js"

export default function init(app) {
   

    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/subcategories', subcategoryRouter)
    app.use('/api/v1/brands', brandRouter)
    app.use('/api/v1/products', productRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/userAuth', authRouter)
    app.use('/api/v1/reviews', reviewRouter)
    app.use('/api/v1/coupons', couponRouter)
    app.use('/api/v1/cart', cartRouter)
    app.use('/api/v1/wishlist', wishRouter)
    app.use('/api/v1/adress', adressRouter)
    app.use('/api/v1/order', orderRouter)

    app.all('*', (req, res, next) => {
        next(new AppError('cant find this route', 404))
    })
    app.use(globalErr)

}