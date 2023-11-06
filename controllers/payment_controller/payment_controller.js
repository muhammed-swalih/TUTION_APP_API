import paymentMode from "../../models/Student_Payment/paymentMode.js";
import { generateToken } from "../../config/generateToken.js";
import crypto from "crypto";
import instance from "../../razorPayInstance.js";
import webinar from "../../models/webinarModel/webinar.js";
import dotenv from "dotenv";

dotenv.config();

export const createOrder = async (req, res) => {
  const { amount } = req.body;
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

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (!isAuthentic) {
    return res.status(404).json("keys don't match");
  }

  const currentTime = new Date();

  const webinarEndingTime = await webinar.findOne({ _id: webinarId });
  const newPayment = new paymentMode({
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
    paidFrom: paidFrom,
    paidTo: paidTo,
    webinarId: webinarId,
    paidToken: generateToken(webinarId),
    tokenExpiresAt: webinarEndingTime.endingTime,
  });

  if (currentTime <= webinarEndingTime.endingTime) {
    const savedPayment = await paymentMode.create(newPayment);
    const response = await paymentMode
      .findOne({ _id: savedPayment._id })
      .populate("paidFrom", "-password")
      .populate("paidTo", "-password")
      .populate("webinarId");

    return res
      .status(200)
      .json(response + "token is valid you are allowed to access this webinar");
  } else {
    return res
      .status(500)
      .json("token is expired, can't participate in this webinar");
  }

};
