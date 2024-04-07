
import { AppError } from './../../utils/AppErr.js';
import { catchAsyncErr } from './../../middleware/catchErr.js';
import { userModel } from './../../../database/models/user.js';


export const addToWishlist = catchAsyncErr(async (req, res, next) => {
    const { product } = req.body
    const result = await userModel.findByIdAndUpdate(req.user._id, {$addToSet:{wishlist:product}},{new:true})
    if (!result) return next(new AppError(`user not found`, 404))
    res.status(200).json({ "message": " success", result:result.wishlist })
})

export const removeFromWishlist = catchAsyncErr(async (req, res, next) => {
    const { product } = req.body
    const result = await userModel.findByIdAndUpdate(req.user._id, {$pull:{wishlist:product}},{new:true})
    if (!result) return next(new AppError(` you are not autherized`, 401))
    res.status(200).json({ "message": " success", result:result.wishlist })
})

export const getAllWishlist = catchAsyncErr(async (req, res, next) => {
    const result = await userModel.findOne({_id:req.user._id}).populate('wishlist')
    if (!result) return next(new AppError(` you are not autherized`, 401))
    res.status(200).json({ "message": " success", result:result.wishlist })
})


 