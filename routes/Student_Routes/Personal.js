import express from 'express'
import { protect, protectStudent } from '../../middlewares/jwt.js';
import { getPersonal, postStudPersonal } from '../../controllers/StudentControllers/StudentPersonalController.js';

const router = express();

router.post("/",protectStudent,postStudPersonal)
router.get("/",protectStudent,getPersonal)

export default router