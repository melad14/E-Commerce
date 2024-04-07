
import slugify from 'slugify';
import { AppError } from '../../utils/AppErr.js';
import { catchAsyncErr } from '../../middleware/catchErr.js';
import { subCategoryModel } from './../../../database/models/subCategory.js';



export const createSubCategory = catchAsyncErr(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file?.filename
    const result = new subCategoryModel(req.body)
    await result.save()
    res.status(201).json({ message: "success", result })
})


export const getAllSubCategory = catchAsyncErr(async (req, res, next) => {
    let filter = {};
    if (req.params.categoryId) {
        filter = { category: req.params.categoryId }
    }
    const result = await subCategoryModel.find(filter)
    !result[0] && next(new AppError('no subcategories founded', 404))
    result && res.status(201).json({ message: "success", page: apiFeat.page, result })
})


export const getSubCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await subCategoryModel.findById(id)
    !result && next(new AppError('subcategory not found', 404))
    result && res.status(201).json({ message: "success", result })
})




export const updateSubCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    if (req.file) {
        req.body.image = req.file?.filename
    }
    const result = await subCategoryModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new AppError('subcategory not found', 404))
    result && res.status(201).json({ message: "success", result })
})


export const deleteSubCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    const result = await subCategoryModel.findByIdAndDelete(id)
    !result && next(new AppError('subcategory not found', 404))
    result && res.status(201).json({ message: "success" })
})

