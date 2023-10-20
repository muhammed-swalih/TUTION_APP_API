import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema({
  orderId: { type: String, required: true },
  entity: { type: String, required: true },
  amount: { type: Number, required: true },
  amount_paid: { type: Number, required: true },
  amount_due: { type: Number, required: true },
  currency: { type: String, required: true },
  receipt: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  paidToken : {type : String , required:  true},
  webinar : {type : mongoose.Schema.Types.ObjectId, ref : "webinarModel"},
  paidTo : {type : mongoose.Schema.Types.ObjectId, ref : "auth"}
});

export default mongoose.model("payment", paymentSchema);
