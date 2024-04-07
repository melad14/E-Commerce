
import Joi from "joi"
export const addWishSchema = Joi.object({
     product: Joi.string().hex().length(24).required(),
});



