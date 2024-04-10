import express from "express"
import {  createCheckOut, ctreateCashOrder, getAllorders, getSpecificorders, webhook } from "./order.controller.js"
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";

const orderRouter = express.Router()
orderRouter.post('/:id',protectedRoutes,allowTo('user'),ctreateCashOrder)
orderRouter.post('/checkout/:id',protectedRoutes,allowTo('user'),createCheckOut)
orderRouter.get('/',protectedRoutes,allowTo('user'),getSpecificorders)
orderRouter.get('/allOrders',protectedRoutes,allowTo('admin'),getAllorders)

orderRouter.post('/webhook', express.raw({type: 'application/json'}), webhook);

export default orderRouter