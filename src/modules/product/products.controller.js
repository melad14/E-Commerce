
import slugify from 'slugify';
import { AppError } from '../../utils/AppErr.js';
import { catchAsyncErr } from './../../middleware/catchErr.js';
import { productModel } from './../../../database/models/products.js';
import { ApiFeatures } from '../../utils/api-features.js';



export const createProduct = catchAsyncErr(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.imgCover = req.files.imgCover[0]?.filename
    req.body.images = req.files.images?.map(obj => obj.filename);
    const result = new productModel(req.body)
    await result.save()
    res.status(201).json({ message: "success", result })
})


export const getAllProduct = catchAsyncErr(async (req, res, next) => {


    let apiFeat = new ApiFeatures(productModel.find(), req.query)
        .pagination().filter().feilds().sorting().search()


    const result = await apiFeat.mongooseQuery

    !result[0] && next(new AppError('Products not found', 404))
    result && res.status(201).json({ message: "success", page: apiFeat.page, result })
})


export const getProduct = catchAsyncErr(async (req, res, next) => {

    const { id } = req.params
    const result = await productModel.findById(id)
    !result && next(new AppError('Product not found', 404))
    result && res.status(201).json({ message: "success", result })
})




export const updateProduct = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    if (req.file.imgCover) {
        req.body.imgCover = req.files?.imgCover[0].filename;
    }
    if (req.file.images) {
        req.body.images = req.files?.images.map(obj => obj.filename);
    }
    const result = await productModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new AppError('Product not found', 404))
    result && res.status(201).json({ message: "success", result })
})


export const deleteProduct = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    const result = await productModel.findByIdAndDelete(id)
    !result && next(new AppError('Product not found', 404))
    result && res.status(201).json({ message: "success" })
})

