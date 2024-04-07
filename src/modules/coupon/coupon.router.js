import express from "express"
import { createCopon, deleteCopon, getAllCopons, getCopon, updateCopon } from "./coupon.controller.js"
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";
import { validation } from './../../middleware/validation.js';
import { createCouponSchema, getCouponSchema, updateCouponSchema } from "./coupon.validatiojn.js";

const couponRouter = express.Router()

couponRouter.post('/',protectedRoutes,allowTo('admin'),validation(createCouponSchema ),createCopon)
couponRouter.get('/',getAllCopons)
couponRouter.get('/:id',validation(getCouponSchema ),getCopon)
couponRouter.put('/:id',protectedRoutes,allowTo('admin'),validation(updateCouponSchema ),updateCopon)
couponRouter.delete('/:id',protectedRoutes,allowTo('admin'),validation(getCouponSchema ),deleteCopon)


export default couponRouter