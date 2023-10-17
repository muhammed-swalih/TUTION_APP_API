import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { getWebinar, postWebinar } from '../../controllers/webinarController/webinarController.js';

const router = express();

router.post("/",protect,postWebinar)
router.get("/",protect,getWebinar)

export default router