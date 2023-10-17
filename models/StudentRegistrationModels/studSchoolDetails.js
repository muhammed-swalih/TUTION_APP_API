import mongoose from "mongoose";
const { Schema } = mongoose;

const schoolSchema = new Schema({
  studentId: { type: String, required: true },
  schoolName: { type: String, required: true },
  schoolAdrs: { type: String, required: true },
  idProof: { type: String, required: true },
});

export default mongoose.model("studentSchool", schoolSchema);
