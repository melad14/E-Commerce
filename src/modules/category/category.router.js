import express from "express"
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "./category.controller.js"
import subcategoryRouter from "../subcategory/subcategory.router.js"
import { validation } from "../../middleware/validation.js"
import { createCatSchema, getCatSchema, updateCatSchema } from "./category.validation.js"
import { fileup } from "../../utils/fileUp.js"
import { allowTo, protectedRoutes } from "../../middleware/protectedRoute.js"
const categoryRouter =express.Router()

categoryRouter.use('/:categoryId/subcategories',subcategoryRouter)

categoryRouter
.route('/')
.post(protectedRoutes,allowTo('admin'),fileup('image','category'),validation(createCatSchema ),createCategory)
.get(getAllCategory)
categoryRouter
.route('/:id')
.get(validation(getCatSchema),getCategory)
.put(protectedRoutes,allowTo('admin'),fileup('image','category'),validation(updateCatSchema),updateCategory)
.delete(protectedRoutes,allowTo('admin'),validation(getCatSchema),deleteCategory)

export default categoryRouter