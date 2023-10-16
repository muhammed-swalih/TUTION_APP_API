 import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { postStudParent } from '../../controllers/StudentControllers/StudentParentController.js';

 const router = express();

 router.post("/",protect,postStudParent)
 
 export default router;