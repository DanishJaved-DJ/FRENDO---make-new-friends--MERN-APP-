import { Router } from "express";
import verifyJWt from '../middlewares/auth.middleware.js'
import signupController from "../controllers/user/signup.controller.js";
import logoutController from "../controllers/user/logout.controller.js";
import loginController from "../controllers/user/login.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import fetchUserProfileController from "../controllers/user/fetchUserProfile.controller.js";
import updateUserDetailsController from "../controllers/user/updateUserDetails.Controller.js";
import changePasswordController from "../controllers/user/changePassword.controller.js";
import updateUserAvatarController from "../controllers/user/updateUserAvatar.controller.js";

const router = Router();

//user routes
router.route('/signup').post(upload.fields([
    {
           name : "avatar",
           maxCount : 1
    },{
        name : "coverImage",
        maxCount : 1
    }
]),signupController);
router.route('/login').post(loginController);
router.route('/logout').post(verifyJWt,logoutController);
router.route('/user-profile').get(verifyJWt,fetchUserProfileController);
router.route('/update-userDetails').put(verifyJWt,updateUserDetailsController);
router.route('/change-password').post(verifyJWt,changePasswordController);
router.route('/update-avatar').post(
    upload.fields([
    {
           name : "avatar",
           maxCount : 1
    },{
        name : "coverImage",
        maxCount : 1
    }
]),verifyJWt,updateUserAvatarController);


export default router;