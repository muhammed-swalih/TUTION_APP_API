import express from 'express'
import { getPersonal, postPersonal } from '../../controllers/TeacherControllers/TeacherPersonlController.mjs';
import { protect } from '../../middlewares/jwt.js';

const router = express();

router.post("/",protect,postPersonal)
router.get("/",protect,getPersonal)

export default router