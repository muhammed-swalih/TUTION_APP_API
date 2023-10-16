import express from 'express'
import { postPersonal } from '../../controllers/TeacherControllers/TeacherPersonlController.js';
import { protect } from '../../middlewares/jwt.js';

const router = express();

router.get("/",(req,res)=>{
    res.json("this is the teacher personal api")
})

router.post("/",protect,postPersonal)

export default router