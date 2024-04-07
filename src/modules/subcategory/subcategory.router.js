import express from "express"
import { createSubCategory, deleteSubCategory, getAllSubCategory, getSubCategory, updateSubCategory } from './subcategory.controller.js';
import { validation } from './../../middleware/validation.js';
import { createSubSchema, getSubSchema, updateSubSchema } from "./subcategory.validation.js";
import { fileup } from "../../utils/fileUp.js";
import { allowTo, protectedRoutes } from './../../middleware/protectedRoute.js';
const subcategoryRouter = express.Router({ mergeParams: true })

subcategoryRouter
    .route('/')
    .post(protectedRoutes,allowTo('admin'),fileup('image','subcategory'),validation(createSubSchema),createSubCategory)
    .get(getAllSubCategory)
subcategoryRouter
    .route('/:id')
    .get(validation(getSubSchema),getSubCategory)
    .put(protectedRoutes,allowTo('admin'),fileup('image','subcategory'),validation(updateSubSchema),updateSubCategory)
    .delete(protectedRoutes,allowTo('admin'),validation(getSubSchema),deleteSubCategory)

export default subcategoryRouter