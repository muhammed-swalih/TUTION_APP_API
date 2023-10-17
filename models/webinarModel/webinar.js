import mongoose from "mongoose";

const { Schema } = mongoose;

const webinarSchema = new Schema({
  teacherId: {type : mongoose.Schema.Types.ObjectId, ref : "auth"},
  date: { type: String, required: true },
  time: { type: String, required: true },
  topic: { type: String, requried: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  amount: { type: String, required: true },
});

export default mongoose.model("webinarModel", webinarSchema);
