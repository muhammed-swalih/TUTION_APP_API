import express from 'express'
import { paymentHolding, protect } from '../../middlewares/jwt';
import { createOrder } from '../../controllers/payment_controller/payment_controller';

const router = express();

router.post('/',protect,createOrder)
router.get('/',protect,paymentHolding)