import mongoose, { Schema } from "mongoose"
import validator from "validator"

const developerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return validator.isLength(value, { min: 3, max: 50 })
        },
        message: "Description must be between 10 and 200 characters",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value)
        },
        message: "Invalid email format",
      },
    },
    avatarUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return validator.isURL(value)
        },
        message: "Invalid avatar URL format",
      },
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return validator.isLength(value, { min: 10, max: 200 })
        },
        message: "Description must be between 10 and 200 characters",
      },
    },
    location: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => {
          return value.every((skill) => typeof skill === "string")
        },
        message: "Skills must be an array of strings",
      },
    },
    experience: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          return value >= 0
        },
        message: "Experience must be a non-negative number",
      },
    },
    githubProfile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isURL(value)
        },
        message: "Invalid GitHub profile URL format",
      },
    },
    linkedinProfile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isURL(value)
        },
        message: "Invalid LinkedIn profile URL format",
      },
    },
  },
  { timestamps: true }
)

// Creating a compound index on the fields used in the $or query
developerSchema.index(
  { name: 1, email: 1, avatarUrl: 1, githubProfile: 1, linkedinProfile: 1 },
  { unique: true } // Ensure uniqueness across these fields
)

export const Devs = mongoose.model("Devs", developerSchema)
