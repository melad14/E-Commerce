
import slugify from 'slugify';
import { AppError } from '../../utils/AppErr.js';
import { catchAsyncErr } from '../../middleware/catchErr.js';
import { brandModel } from '../../../database/models/brands.js';
import { ApiFeatures } from '../../utils/api-features.js';



export const createBrand = catchAsyncErr(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file?.filename

    const result = new brandModel(req.body)
    await result.save()
    res.status(201).json({ message: "success", result })
})


export const getAllBrand = catchAsyncErr(async (req, res, next) => {

    let apiFeat = new ApiFeatures(brandModel.find(), req.query)
        .pagination().filter().feilds().sorting().search()
    const result = await apiFeat.mongooseQuery
    !result[0] && next(new AppError('no brands founded', 404))
    result && res.status(201).json({ message: "success", page: apiFeat.page, result })
})


export const getBrand = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await brandModel.findById(id)
    !result && next(new AppError('Brand not found', 404))
    result && res.status(201).json({ message: "success", result })
})




export const updateBrand = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    if (req.file) {
        req.body.logo = req.file?.filename
    }
    const result = await brandModel.findByIdAndUpdate(id, req.body, { new: true })
    !result && next(new AppError('Brand not found', 404))
    result && res.status(201).json({ message: "success", result })
})


export const deleteBrand = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    const result = await brandModel.findByIdAndDelete(id)
    !result && next(new AppError('Brand not found', 404))
    result && res.status(201).json({ message: "success" })
})

