import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { postStudPersonal } from '../../controllers/StudentControllers/StudentPersonalController.js';

const router = express();

router.post("/",protect,postStudPersonal)

export default router