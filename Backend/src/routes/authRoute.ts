import express from "express";

const router = express.Router();
const authController = require("../controllers/authController");

router.route("/signin").post(authController.signIn);
router.route("/signup").post(authController.signUp);
router.route("/refresh").post(authController.refreshTokenSignIn);
router.route("/logout").delete(authController.verifyUser, authController.logoutSpecificDevice);
router.route("/logoutall").delete(authController.verifyUser,authController.logoutAllDevices);

module.exports = router;
