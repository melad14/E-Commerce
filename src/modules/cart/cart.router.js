import express from "express"
import { addTocart, applyCoupon, getLoggedUserCart, removeFromCart, updateQuantity } from "./cart.controller.js"
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js"

const cartRouter = express.Router()
cartRouter.post('/',protectedRoutes,allowTo('user'),addTocart)
cartRouter.get('/',protectedRoutes,allowTo('user'),getLoggedUserCart)
cartRouter.put('/:id',protectedRoutes,allowTo('user'),updateQuantity)
cartRouter.post('/apllyCopon',protectedRoutes,allowTo('user'),applyCoupon)
cartRouter.delete('/:id',protectedRoutes,allowTo('user'),removeFromCart)


export default cartRouter