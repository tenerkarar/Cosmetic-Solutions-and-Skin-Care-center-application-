import express from "express";

const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const authController = require("../controllers/authController");

router
   .route("/")
   .get(authController.verifyUser, authController.checkRole(["normal", "admin"]), appointmentController.getAllAppointments)
   .post(authController.verifyUser, authController.checkRole(["normal", "admin"]), appointmentController.addAppointment);

router
  .route("/all")
  .get(authController.verifyUser, authController.checkRole(["admin"]), appointmentController.getAllUserAppointments);

router
  .route("/toggle/:id")
  .patch(authController.verifyUser, authController.checkRole(["admin"]), appointmentController.toggleAppointmentStatus);

router
  .route("/:id")
  .get(authController.verifyUser, authController.checkRole(["admin", "normal"]), appointmentController.getSpecificAppointment)
  .delete(authController.verifyUser, authController.checkRole(["admin", "normal"]), appointmentController.deleteAppointment)
  .patch(authController.verifyUser, authController.checkRole(["admin", "normal"]), appointmentController.updateAppointment);

module.exports = router;
