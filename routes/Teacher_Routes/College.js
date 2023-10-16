import express from 'express'
import { postCollegeDetails } from '../../controllers/TeacherControllers/TeacherCollegeController.js';
import { protect } from '../../middlewares/jwt.js';

const router = express();

router.get("/",(req,res)=>{
    res.json("this is the collge details page of the teacher")
})

router.post("/",protect,postCollegeDetails)

export default router