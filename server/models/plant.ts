import mongoose from "mongoose";

export default new mongoose.Schema({
  createdAt: Date,
  name: String,
  waterings: [Date]
});
