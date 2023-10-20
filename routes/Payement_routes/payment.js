import express from 'express'
import { paymentHolding, protect } from '../../middlewares/jwt.js';
import { createOrder } from '../../controllers/payment_controller/payment_controller.js';

const router = express();

router.post("/",protect,createOrder)

// router.get("/",protect,paymentHolding,)

export default router