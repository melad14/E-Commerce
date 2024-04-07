import jwt from "jsonwebtoken";
import { catchAsyncErr } from "./catchErr.js";
import { AppError } from "../utils/AppErr.js";
import { userModel } from "../../database/models/user.js";


export const protectedRoutes = catchAsyncErr(async (req, res, next) => {

    const { token } = req.headers
    if (!token) return next(new AppError('token not provided', 401))

    let decoded = jwt.verify(token, process.env.JWT_KEY)

    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError(' invalid token ', 401))


    if (user.changePassAt) {
        let changePassDate = parseInt(user.changePassAt.getTime() / 1000)
        if (changePassDate > decoded.iat) return next(new AppError(' invalid token ', 401))
    }
    req.user = user
    next()
})


export const allowTo=(...roles)=>{
    return catchAsyncErr(async (req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError('you are not authorized to access this route . you are '+req.user.role,401))
        
        next()
    })
}


