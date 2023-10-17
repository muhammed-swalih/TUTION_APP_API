import mongoose from "mongoose";

const { Schema } = mongoose;

const CollegeSchema = new Schema({
  teacherId: { type: String, required: true },
  collegeName: { type: String, required: true },
  colAddress: { type: String, required: true },
  courses: { type: String, required: true },
  currentYear: { type: String, required: true },
  joined: { type: String, required: true },
  passOutYear: { type: String, required: true },
  collegeId: { type: String, required: true },
});

export default mongoose.model("TeacherCollege", CollegeSchema);
