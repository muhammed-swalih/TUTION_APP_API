 import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { getParents, postStudParent } from '../../controllers/StudentControllers/StudentParentController.js';

 const router = express();

 router.post("/",protect,postStudParent)
 router.get("/",protect,getParents)
 
 export default router;