import { Router } from "express";
import {
  changePass,
  getAllUsers,
  getUser,
  logOut,
  logInUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getSubscribedCategories,
  subscribeToCategories,
  unsubscribeFromCategories,
} from "../controllers/user.subscribe.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/getAllUsers").get(getAllUsers);

//------------- secure routes

router.route("/getUser").get(verifyToken, getUser);
router.route("/logout").get(verifyToken, logOut);
router.route("/changePass").post(verifyToken, changePass);

// ------- subscribe
router.route("/subscribe").post(verifyToken, subscribeToCategories);
router.route("/unSubscribe").post(verifyToken, unsubscribeFromCategories);
router.route("/getSubscribed").get(verifyToken, getSubscribedCategories);

export default router;
