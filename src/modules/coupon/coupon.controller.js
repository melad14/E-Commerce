import QRCode from "qrcode";
import { catchAsyncErr } from "../../middleware/catchErr.js";
import { coponModel } from './../../../database/models/coupon.js';
import { ApiFeatures } from "../../utils/api-features.js";
import { AppError } from './../../utils/AppErr.js';



export const createCopon = catchAsyncErr(async (req, res, next) => {
    const result = new coponModel(req.body)
    await result.save()
    res.status(201).json({ "message": " success", result })
})

export const getAllCopons = catchAsyncErr(async (req, res,next) => {
    let apiFeat = new ApiFeatures(coponModel.find(), req.query)
    .pagination().filter().feilds().sorting().search()

    let result = await apiFeat.mongooseQuery
    !result[0] && next(new AppError('coupons not found', 404))
    result && res.status(201).json({ message: "success", page: apiFeat.page, result })
})


export const getCopon = catchAsyncErr(async (req, res, next) => { 
    const { id } = req.params

    const result = await coponModel.findById(id)
    let url = await QRCode.toDataURL(result.code)
    if (!result) return next(new AppError(`coupon not found`, 404))
    res.status(200).json({ "message": " success", result, url })
})


export const updateCopon = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await coponModel.findOneAndUpdate(id, req.body, { new: true })
    if (!result) return next(new AppError(`coupon not found or you are not autherized`, 404))
    res.status(200).json({ "message": " success", result })
})


export const deleteCopon = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    const result = await coponModel.findByIdAndDelete(id)
    !result && next(new AppError('coupon not found', 404))
    result && res.status(201).json({ message: "success" })
})

 
