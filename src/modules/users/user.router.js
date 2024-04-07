import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, updateUser,changePassword } from "./user.controller.js"
import { validation } from "../../middleware/validation.js"
import { createUserSchema, getAndDeleteUserSchema, updateUserSchema } from "./user.validation.js"
import { allowTo, protectedRoutes } from './../../middleware/protectedRoute.js';


const userRouter = express.Router()



userRouter
.route('/')
.post(protectedRoutes,allowTo('admin'),validation(createUserSchema),createUser)
.get(protectedRoutes,allowTo('admin'),getAllUsers)

userRouter
.route('/:id')
.get(protectedRoutes,allowTo('admin'),validation(getAndDeleteUserSchema),getUser)
.put(protectedRoutes,allowTo('admin'),validation(updateUserSchema),updateUser)
.delete(protectedRoutes,allowTo('admin'),validation(getAndDeleteUserSchema),deleteUser)
userRouter
.route('/changePassword/:id')
.patch(protectedRoutes,allowTo('admin'),validation(getAndDeleteUserSchema),changePassword)


export default userRouter