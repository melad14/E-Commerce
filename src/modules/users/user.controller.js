
import { catchAsyncErr } from '../../middleware/catchErr.js';
import { AppError } from '../../utils/AppErr.js';
import { ApiFeatures } from '../../utils/api-features.js';
import { userModel } from './../../../database/models/user.js';




export const createUser = catchAsyncErr(async (req, res, next) => {

    let user = await userModel.findOne({ email: req.body.email })
    if (user) return next(new AppError(`User already exist`, 409))
    const result = new userModel(req.body)
    await result.save()
    res.status(201).json({ "message": " success", result })
})

export const getAllUsers = catchAsyncErr(async (req, res,next) => {

    let apiFeat = new ApiFeatures(userModel.find(), req.query)
    .pagination().filter().feilds().sorting().search()

    let result = await apiFeat.mongooseQuery
    !result[0] && next(new AppError('users not found', 404))
    res.status(200).json({ "message": " success", page: apiFeat.page, result })
})

export const getUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await userModel.findById(id)
    if (!result) return next(new AppError(`User not found`, 404))
    res.status(200).json({ "message": " success", result })
})

export const updateUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await userModel.findByIdAndUpdate(id, req.body,{new:true})
    if (!result) return next(new AppError(`User not found`, 404))
    res.status(200).json({ "message": " success", result })
})

export const changePassword = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    req.body.changePassAt = Date.now()
    const result = await userModel.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) return next(new AppError(`User not found`, 404))
    res.status(200).json({ "message": " success", result })
})

 export const deleteUser = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    const result = await userModel.findByIdAndDelete(id)
    !result && next(new AppError('user not found', 404))
    result && res.status(201).json({ message: "success" })
})


