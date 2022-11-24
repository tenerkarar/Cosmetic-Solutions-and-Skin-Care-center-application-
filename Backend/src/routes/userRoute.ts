import express from "express";

const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.verifyUser,
    authController.checkRole(["normal", "admin"]),
    userController.getUser
  );

router
  .route("/all/")
  .get(
    authController.verifyUser,
    authController.checkRole(["admin"]),
    userController.getAllUsers
  );

router
  .route("/:id")
  .get(
    authController.verifyUser,
    authController.checkRole(["admin"]),
    userController.getUserById
  )
  .delete(
    authController.verifyUser,
    authController.checkRole(["admin"]),
    userController.deleteUser
  );

module.exports = router;
