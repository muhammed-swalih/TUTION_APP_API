import mongoose from "mongoose";
const { Schema } = mongoose;

const parentSchema = new Schema({
  guardian: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("parentSchema", parentSchema);
