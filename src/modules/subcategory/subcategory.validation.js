 
import Joi from "joi"

 export const  createSubSchema=Joi.object({  
      name:Joi.string().min(2).max(20).required(),
      category:Joi.string().hex().length(24).required()

 })
 export const  getSubSchema=Joi.object({  
      id:Joi.string().hex().length(24).required()
 })

 export const  updateSubSchema=Joi.object({  
      id:Joi.string().hex().length(24).required(),
      name:Joi.string().min(2).max(20),
      category:Joi.string().hex().length(24)


 })
