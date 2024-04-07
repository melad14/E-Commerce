
import Joi from "joi"
const addressSchema = Joi.object({
     city: Joi.string().required(),
     street: Joi.string().required(),
     phone: Joi.string().required()
});

export const createUserSchema = Joi.object({
     name: Joi.string().min(3).max(15).required(),
     email: Joi.string().email().required(),
     role: Joi.string(),
     profilePic: Joi.string(),
     adresses: Joi.array().items(addressSchema),
     password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{6,20}$/).required(),
})

export const updateUserSchema = Joi.object({
     name: Joi.string().min(3).max(15),
     email: Joi.string().email(),
     role: Joi.string(),
     profilePic: Joi.string(),
     adresses: Joi.array().items(addressSchema),
     password: Joi.string().pattern(/^[A-Z][a-z0-9A-Z@&_]{6,20}$/),
})

export const getAndDeleteUserSchema = Joi.object({
     id: Joi.string().hex().length(24).required(),
})


