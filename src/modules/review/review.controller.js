import { catchAsyncErr } from "../../middleware/catchErr.js"
import { AppError } from "../../utils/AppErr.js";
import { ApiFeatures } from "../../utils/api-features.js";
import { reviewModel } from './../../../database/models/reviews.js';



export const createReview = catchAsyncErr(async (req, res, next) => {
     req.body.user=req.user._id
     let isReview=await reviewModel.findOne({user:req.user._id,product:req.body.product})
     if(isReview)return  next(new AppError(`you already made a review about this product`, 409))
    const result = new reviewModel(req.body)
    await result.save()
    res.status(201).json({ "message": " success", result })
})

export const getAllReviews = catchAsyncErr(async (req, res,next) => {
    let apiFeat = new ApiFeatures(reviewModel.find(), req.query)
    .pagination().filter().feilds().sorting().search()

    let result = await apiFeat.mongooseQuery
    !result[0] && next(new AppError('reviews not found', 404))
    res.status(200).json({ "message": " success", page: apiFeat.page, result })
})

export const getReview = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await reviewModel.findById(id)
    if (!result) return next(new AppError(`Review not found`, 404))
    res.status(200).json({ "message": " success", result })
})

export const updateReview = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await reviewModel.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true })
    if (!result) return next(new AppError(`Review not found or you are not autherized`, 404))
    res.status(200).json({ "message": " success", result })
})



export const deleteReview = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params

    const result = await reviewModel.findByIdAndDelete({ _id: id, user: req.user._id })
    !result && next(new AppError('review not found', 404))
    result && res.status(201).json({ message: "success" })
})

