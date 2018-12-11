import mongoose from "mongoose";
import PlantSchema from "./plant";
import uuid from "uuid/v4";

export default new mongoose.Schema({
  key: {
    type: String,
    index: true,
    default: uuid
  },
  plants: [PlantSchema]
});
