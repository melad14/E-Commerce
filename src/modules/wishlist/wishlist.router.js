import express from "express"
import { allowTo, protectedRoutes } from './../../middleware/protectedRoute.js';
import { addToWishlist, getAllWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { validation } from "../../middleware/validation.js";
import { addWishSchema } from "./wishlist.validation.js";

const wishRouter = express.Router()
wishRouter.patch('/',protectedRoutes,allowTo('user'),validation(addWishSchema) ,addToWishlist)
wishRouter.delete('/',protectedRoutes,allowTo('user'),validation(addWishSchema) ,removeFromWishlist)
wishRouter.get('/',protectedRoutes,allowTo('user'),getAllWishlist)


export default wishRouter