import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { getReqFromStud, postReqFromStud } from '../../controllers/studentRequestController/ReqController.js';

const router = express();

router.post("/",protect,postReqFromStud)
router.get("/",protect,getReqFromStud)


export default router