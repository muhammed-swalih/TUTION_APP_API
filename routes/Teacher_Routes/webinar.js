import express from "express";
import { paymentHolding, protect } from "../../middlewares/jwt.js";
import {
  enrollWebinar,
  getStudentsForWebinar,
  getWebinar,
  getWebinarDetailsForStudents,
  postWebinar,
} from "../../controllers/webinarController/webinarController.js";

const router = express();

router.post("/", protect, postWebinar);
router.get("/", protect, getWebinar);
router.get("/allwebinars", protect, getWebinarDetailsForStudents);
router.get("/getPaidStud", protect, paymentHolding, enrollWebinar);
router.get("/myStudents", protect, getStudentsForWebinar);

export default router;
