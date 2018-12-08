import mongoose from "mongoose";
import PlantSchema from "./plant";

export default new mongoose.Schema({
  key: String,
  plants: [PlantSchema]
});
