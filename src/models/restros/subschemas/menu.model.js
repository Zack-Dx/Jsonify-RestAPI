import { Schema } from "mongoose"

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
