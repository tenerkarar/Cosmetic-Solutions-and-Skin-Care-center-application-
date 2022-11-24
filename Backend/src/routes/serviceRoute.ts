import express from "express";

const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authController = require("../controllers/authController");

router.route("/");
// .get(authController.verifyUser, authController.checkRole(["normal", "admin"]), serviceController.getAllServicesFromAppointment);

router
  .route('/')
  .get(serviceController.getAllAvailableServices);

router
  .route('/add')
  .post(
    authController.verifyUser,
    authController.checkRole(["admin"]),
    serviceController.createService
);
  
router
  .route("/admin/:id")
  .delete(
    authController.verifyUser,
    authController.checkRole(["admin"]),
    serviceController.deleteService
  );

router
  .route("/:id")
  .get(
    authController.verifyUser,
    authController.checkRole(["admin", "normal"]),
    serviceController.getAllServicesFromAppointment
  )
  .delete(
    authController.verifyUser,
    authController.checkRole(["admin", "normal"]),
    serviceController.deleteServiceAppointment
  )
  .post(
    authController.verifyUser,
    authController.checkRole(["normal", "admin"]),
    serviceController.addServiceToAppointment
  );

module.exports = router;
