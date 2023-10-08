import Joi from "joi"

export const restroValidationSchema = Joi.object({
  info: Joi.object({
    name: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
    locality: Joi.string(),
    areaName: Joi.string(),
    cuisines: Joi.array().items(Joi.string()).min(1).required(),
    avgRating: Joi.number().min(0).max(5).required(),
    veg: Joi.boolean().required(),
    deliveryTime: Joi.number().required(),
    isOpen: Joi.boolean().required(),
  }).required(),
  menu: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      imageUrl: Joi.string().uri().required(),
      isVeg: Joi.boolean().required(),
      price: Joi.number().required(),
    })
  ),
})

export const devValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  avatarUrl: Joi.string().uri().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).min(1).required(),
  experience: Joi.number().min(0).required(),
  githubProfile: Joi.string().uri().required(),
})
