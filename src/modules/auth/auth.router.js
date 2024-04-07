import express from "express"
import { validation } from './../../middleware/validation.js';
import { loginSchema, registerSchema } from "./auth.validation.js";
import { signIn, signUp } from './auth.controller.js';



const authRouter = express.Router()
authRouter.post('/signup',validation(registerSchema),signUp)
authRouter.post('/signin',validation(loginSchema),signIn)



export default authRouter