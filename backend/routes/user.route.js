import express from "express"
import { getProfile, login, logout, register, updateProfile, updateResume } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {signleUpload} from "../middlewares/multer.js"

const router = express.Router()


router.route("/register").post(register);
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated ,signleUpload, updateProfile)
router.route("/getprofile").get(isAuthenticated,getProfile)
router.route("/profile/update/resume").post(isAuthenticated,signleUpload,updateResume)


export default router;