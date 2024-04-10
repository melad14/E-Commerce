import express from "express"
import {  createCheckOut, ctreateCashOrder, getAllorders, getSpecificorders } from "./order.controller.js"
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";

const orderRouter = express.Router()
orderRouter.post('/:id',protectedRoutes,allowTo('user'),ctreateCashOrder)
orderRouter.post('/checkout/:id',protectedRoutes,allowTo('user'),createCheckOut)
orderRouter.get('/',protectedRoutes,allowTo('user'),getSpecificorders)
orderRouter.get('/allOrders',protectedRoutes,allowTo('admin'),getAllorders)


export default orderRouter