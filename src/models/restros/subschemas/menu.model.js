import { Schema } from "mongoose"
import validator from "validator"

export const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid URL format for imageUrl",
    },
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})
