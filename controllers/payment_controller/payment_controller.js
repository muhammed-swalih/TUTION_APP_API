import Razorpay from "razorpay";
import paymentMode from "../../models/Student_Payment/paymentMode.js";
import { generateToken } from "../../config/generateToken.js";
export const createOrder = async (req, res) => {
  const { amount, paidBy, webinar, paidTo } = req.body;
  console.log(paidBy);
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_B1r19Lwxtp5hxP",
      key_secret: "JfqEmXLfpifeEMVRVbVoigjP",
    });

    var options = {
      amount: amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, async (err, order) => {
      //   console.log(order);
      const newPaymentOrder = new paymentMode({
        orderId: order.id,
        entity: order.entity,
        amount: order.amount,
        amount_paid: order.amount_paid,
        amount_due: order.amount_due,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
        paidBy: paidBy,
        paidToken: generateToken(webinar),
        webinar: webinar,
        paidTo: paidTo,
      });

      try {
        const newOrder = await paymentMode.create(newPaymentOrder);
        const response = await paymentMode
          .findOne({ _id: newOrder._id })
          .populate("paidBy", "-password")
          .populate("webinar")
          .populate("paidTo");
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


