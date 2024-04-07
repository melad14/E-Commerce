import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "./products.controller.js"
import { validation } from './../../middleware/validation.js';
import { createProductSchema, getProductSchema, updateProductSchema } from "./product.validation.js";
import { Mixfileup } from "../../utils/fileUp.js";
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js";
const productRouter =express.Router()
const arrayFields=[{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 10 }]


productRouter
.route('/')
.post(protectedRoutes,allowTo('admin'),Mixfileup(arrayFields,'products'),validation(createProductSchema),createProduct)
.get(getAllProduct)
productRouter
.route('/:id')
.get(validation(getProductSchema),getProduct)
.put(protectedRoutes,allowTo('admin'),Mixfileup(arrayFields,'products'),validation(updateProductSchema),updateProduct)
.delete(protectedRoutes,allowTo('admin'),validation(getProductSchema),deleteProduct)

export default productRouter