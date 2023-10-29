import express from "express";
import { paymentHolding, protect } from "../../middlewares/jwt.js";
import { createOrder, verifyPayment } from "../../controllers/payment_controller/payment_controller.js";

const router = express();

router.post("/", protect, createOrder);
router.post("/paymentverification", verifyPayment);

// router.get("/",protect,paymentHolding,)

export default router;
