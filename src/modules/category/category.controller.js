
import slugify from 'slugify';
import { CategoryModel } from './../../../database/models/category.js';
import { catchAsyncErr } from './../../middleware/catchErr.js';
import { ApiFeatures } from '../../utils/api-features.js';
import { AppError } from '../../utils/AppErr.js';



export const createCategory = catchAsyncErr(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file?.filename
    const result = new CategoryModel(req.body)
    await result.save()
    res.status(201).json({ message: "success", result })
})


export const getAllCategory = catchAsyncErr(async (req, res, next) => {
    
    let apiFeat= new ApiFeatures( CategoryModel.find(),req.query)
    .pagination().filter().feilds().sorting().search()
    const result = await apiFeat.mongooseQuery
    !result[0] && next(new AppError('categories not found', 404))
    result && res.status(201).json({ message: "success", page: apiFeat.page, result })
})


export const getCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await CategoryModel.findById(id)
    !result && next(new AppError('category not found', 404))
    result && res.status(201).json({ message: "success", result })
})




export const updateCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    if (req.file) {
        req.body.image = req.file?.filename
    }
    const result = await CategoryModel.findByIdAndUpdate(id, req.body,{new:true})
    !result && next(new AppError('category not found', 404))
    result && res.status(201).json({ message: "success", result })
})


export const deleteCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    const result = await CategoryModel.findByIdAndDelete(id)
    !result && next(new AppError('category not found', 404))
    result && res.status(201).json({ message: "success" })
})

