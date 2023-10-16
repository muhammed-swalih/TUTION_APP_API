import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    reqId: { type: mongoose.Schema.Types.ObjectId, ref: "studentRequest" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  },
  { timestamps: true }
);

export default mongoose.model("classes", classSchema);
