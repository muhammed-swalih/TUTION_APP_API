import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { getSchool, postStudSchool } from '../../controllers/StudentControllers/StudSchoolController.js';

const router = express();

router.post('/',protect,postStudSchool)
router.get("/",protect,getSchool)

export default router