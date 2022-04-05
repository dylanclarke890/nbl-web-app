import * as mongoose from "mongoose";

let treatmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
  isActive: {
    type: Boolean,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Treatment", treatmentSchema);
