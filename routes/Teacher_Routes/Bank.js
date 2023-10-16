import express from 'express'
import { postBankDetails } from '../../controllers/TeacherControllers/TeacherBankControllers.js';
import { protect } from '../../middlewares/jwt.js';

const router = express();

router.get("/",(req,res)=>{
    res.json("this is the teacher bank route")
})

router.post("/",protect,postBankDetails)

export default router