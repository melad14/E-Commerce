import express from "express"
import { createBrand, deleteBrand, getAllBrand, getBrand, updateBrand } from './brand.controller.js';
import { validation } from "../../middleware/validation.js";
import { createBrandSchema, getBrandSchema, updateBrandSchema } from "./brand.validation.js";
import { fileup } from "../../utils/fileUp.js";
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";
const brandRouter = express.Router()

brandRouter
    .route('/')
    .post(protectedRoutes,allowTo('admin'),fileup('logo','brands'),validation(createBrandSchema),createBrand)
    .get(getAllBrand)
brandRouter
    .route('/:id')
    .get(validation(getBrandSchema),getBrand)
    .put(protectedRoutes,allowTo('admin'),fileup('logo','brands'),validation(updateBrandSchema),updateBrand)
    .delete(protectedRoutes,allowTo('admin'),validation(getBrandSchema),deleteBrand)

export default brandRouter