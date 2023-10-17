import mongoose from "mongoose";
const { Schema } = mongoose;

const PersonalSchema = new Schema({
  studentId : {type : String, required : true},
  gender : {type : String, required : true},
  dob: { type: String, required: true },
  primaryLang: { type: String, required: true },
  secondaryLang: { type: String, required: true },
  PrimaryPhone: { type: String, required: true },
  SecondaryPhone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  img: { type: String, required: true },
});

export default mongoose.model("studentPersonal", PersonalSchema);
