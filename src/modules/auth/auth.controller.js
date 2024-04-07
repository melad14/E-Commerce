import { userModel } from "../../../database/models/user.js"
import { catchAsyncErr } from "../../middleware/catchErr.js"
import { AppError } from "../../utils/AppErr.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp = catchAsyncErr(async (req, res, next) => {
    const { email, password, name } = req.body
    let finded = await userModel.findOne({ email })
    if (finded) return next(new AppError("email already exist", 409))
    let user = new userModel({ name, email, password })
    await user.save()
    res.status(200).json({ "message": " success", user })

    // sendEmail(email, 'comfirm email', `<a href="http://localhost:3000/users/verfiy/${token}"><button style="width: 100px;height: 50px; background-color: rgb(74, 121, 106);font-size:larger;">verfiy</button></a>`)
})

export const signIn = catchAsyncErr(async (req, res, next) => {
    const { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!user || !await bcrypt.compare(password, user.password)) {
        return next(new AppError("incorrect email or password", 400))
    }
    let token = jwt.sign({ name: user.name, userId: user._id, role: user.role }, process.env.JWT_KEY)
    res.json({ "message": "success", token })
})



