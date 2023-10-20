import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { getAssignmentGivenByTeachers, getSubmittedAssignmentByTeacher, postAssignment, submitAssignments } from '../../controllers/assignmentController/assignmentController.js';

const router = express();

router.post("/",protect,postAssignment)
router.post("/submit",protect,submitAssignments)
router.get("/",protect,getSubmittedAssignmentByTeacher)
router.get("/takeAss",protect,getAssignmentGivenByTeachers)

export default router