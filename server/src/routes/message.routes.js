import { Router } from "express";
import verifyJWt from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import sendMessageController from "../controllers/message/sendMessage.controller.js";


const router = Router();

router.route('/send-message').post(upload.fields([
    {
           name : "fileUrl",
           maxCount : 1
    }
]),verifyJWt,sendMessageController);

export default  router;