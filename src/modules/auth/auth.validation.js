
import Joi from "joi"

export const registerSchema = Joi.object({
     name: Joi.string().min(3).max(15).required(),
     email: Joi.string().email().required(),
     password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{6,20}$/).required(),
})

export const loginSchema = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{3,20}$/).required(),
})


