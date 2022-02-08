/** @format */

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      trim: true,
      require: [true, "Title field value is required"],
      unique: [true, "Title should be unique"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [50, "Maximum 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      require: [true, "Description field value is required"],
      unique: [true, "Description should be unique"],
      minlength: [5, "Minimum 5 characters"],
      maxlength: [500, "Maximum 500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
