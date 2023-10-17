import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { getPersonal, postStudPersonal } from '../../controllers/StudentControllers/StudentPersonalController.js';

const router = express();

router.post("/",protect,postStudPersonal)
router.get("/",protect,getPersonal)

export default router