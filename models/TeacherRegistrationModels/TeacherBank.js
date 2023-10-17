import mongoose from "mongoose";
const { Schema } = mongoose;

const BankSchema = new Schema({
  teacherId: { type: String, required: true },
  bankHolderName: { type: String, required: true },
  bankName: { type: String, required: true },
  accNo: { type: String, required: true },
  ifsc: { type: String, required: true },
  bio: { type: String, required: true },
  video: { type: String, required: true },
});

export default mongoose.model("TeacherBank", BankSchema);
