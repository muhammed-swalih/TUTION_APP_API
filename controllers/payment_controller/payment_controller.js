import paymentMode from "../../models/Student_Payment/paymentMode.js";
import { generateToken } from "../../config/generateToken.js";
import crypto from "crypto";
import instance from "../../razorPayInstance.js";


export const createOrder = async (req, res) => {
  const { amount } = req.body;
  // console.log(paidBy);
  try {
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };

    try {
      const order = await instance.orders.create(options);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paidFrom,
    paidTo,
    webinarId,
  } = req.body;
  console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const isAlreadyPaid = await paymentMode.findOne({
    paidFrom: paidFrom,
    paidTo: paidTo,
    webinarId: webinarId,
  });
  if (isAlreadyPaid) {
    res.status(500).json("you are already paid for this webinar");
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", "JfqEmXLfpifeEMVRVbVoigjP")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (!isAuthentic) {
    res.status(500).json("keys are dosn't match");
    return;
  }
  const newPayment = new paymentMode({
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
    paidFrom: paidFrom,
    paidTo: paidTo,
    webinarId: webinarId,
    paidToken: generateToken(webinarId),
  });
  try {
    const savedPayment = await paymentMode.create(newPayment);
    const response = await paymentMode
      .findOne({ _id: savedPayment._id })
      .populate("paidFrom", "-password")
      .populate("paidTo", "-password")
      .populate("webinarId");

    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
