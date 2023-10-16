import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { postStudSchool } from '../../controllers/StudentControllers/StudSchoolController.js';

const router = express();

router.post('/',protect,postStudSchool)

export default router