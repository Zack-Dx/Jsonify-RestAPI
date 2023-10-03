import { Schema, model } from "mongoose"
import validator from "validator"

const restaurantSchema = new Schema({
  info: {
    id: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isNumeric(value),
        message: "Invalid id format",
      },
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    areaName: {
      type: String,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    avgRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      validate: {
        validator: (value) => value >= 0 && value <= 5,
        message: "Average rating must be between 0 and 5",
      },
    },
    veg: {
      type: Boolean,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (value) => value >= 0,
        message: "Delivery time must be a non-negative number",
      },
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  menu: {
    type: Array,
  },
})

export const Restro = model("Restros", restaurantSchema)
