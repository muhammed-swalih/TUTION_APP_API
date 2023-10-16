import mongoose from "mongoose";

const { Schema } = mongoose;

const ReqSchema = new Schema({
  teacherId: [{ type: mongoose.Schema.Types.ObjectId, ref: "auth" }],
  studPersonal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentPersonal",
  },
  studSchool: { type: mongoose.Schema.Types.ObjectId, ref: "studentSchool" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  time: { type: String, required: true },
  subjectOne : {type : String, required : true},
  subjectTwo : {type : String, required : true}
});

export default mongoose.model("studentRequest", ReqSchema);