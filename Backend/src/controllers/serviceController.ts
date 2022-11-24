import { QueryError, RowDataPacket } from "mysql2";
import express from "express";

const regexLib = require("../util/regexLibrary");
const db = require("../database/db_config");

/**
 *  @description
 * add a service to an appointment
 *
 */
export const addServiceToAppointment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // get appointment id
  const appointmentId = req.params.id;
  // get the id for which to add to the appointment
  const { service_id } = req.body;

  if (!appointmentId) return next({ message: "No appointment id sent!" });
  if (!service_id) return next({ message: "No service id sent!" });

  const checkServiceSql = `select * from service where service_id = ?`;
  const sql = `insert into appoints_service (appointment_id, service_id) values (?, ?)`;
  const checkTwiceSql = `select * from appoints_service where service_id = ? and appointment_id = ?`;

  db.query(
    checkServiceSql,
    [service_id],
    (error: QueryError, result: RowDataPacket[]) => {
      if (result.length < 1)
        return next({ message: `There is no such service available!` });

      db.query(
        checkTwiceSql,
        [service_id, appointmentId],
        (error3: QueryError, result3: RowDataPacket[]) => {
          if (error3) return next({ message: error3 });
          if (result3.length > 0)
            return next({
              message: "This service is already part of this appointment"
            });

          db.query(
            sql,
            [appointmentId, service_id],
            (error: QueryError, result: RowDataPacket[]) => {
              if (error) return next({ message: error });
              res
                .status(200)
                .json({
                  message: `Service added to the appointment successfully!`
                });
              next();
            }
          );
        }
      );
    }
  );
};

/**
 * @description
 * delete a service from an appointment
 */
export const deleteServiceAppointment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // get appointment id
  const appointmentId: number = Number(req.params.id);
  // get the id for which to add to the appointment
  const { service_id } = req.body;

  if (!appointmentId) return next({ message: "No appointment id sent!" });
  if (!service_id) return next({ message: "No service id sent!" });

  const sql = `delete from appoints_service where appointment_id = ? and service_id = ?`;
  const checkAppointmentSql = `select * from appoints_service where appointment_id = ? and service_id = ?`;

  db.query(
    checkAppointmentSql,
    [appointmentId, service_id],
    (error: QueryError, result: RowDataPacket[]) => {
      if (result.length < 1)
        return next({
          message: "There is no such service attached to this appointment!"
        });

      db.query(
        sql,
        [appointmentId, service_id],
        (error2: QueryError, result2: RowDataPacket[]) => {
          if (error2) return next({ message: error2 });
          res
            .status(200)
            .json({
              message: `This service has been deleted from this appointment successfully!`
            });
          next();
        }
      );
    }
  );
};

/**
 * @description get all services from this appointment
 */
export const getAllServicesFromAppointment = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // get appointment id
  const appointmentId = Number(req.params.id);

  if (!appointmentId) return next({ message: "No appointment id sent!" });

  const sql = `select service.service_id, service.name, service.description, service.price, service.points, appoints_service.appointment_id
     from service
     inner join appoints_service
     on appoints_service.service_id = service.service_id
     where appoints_service.appointment_id = ?`;

  db.query(
    sql,
    [appointmentId],
    (error: QueryError, result: RowDataPacket[]) => {
      if (error) return next({ message: error });
      res.status(200).json(result);
      next();
    }
  );
};

export const getAllAvailableServices = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {

  const sql = `select * from service order by name`;

  db.query(
    sql,
    (error: QueryError, result: RowDataPacket[]) => {
      if (error) return next({ message: error });
      res.status(200).json(result);
      next();
    }
  );

};

export const createService = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {

  const { name, description, price, points } = req.body;

  if (!name || !description || !price || !points) return next({ message: "Please fill out all the fields" });

  const sql = `insert into service (name, description, price, points) values (?, ?, ?, ?)`;
  const checkExistSql = `select * from service where name = ?`;


  db.query(
    checkExistSql, [name], (error: QueryError, result: RowDataPacket[]) => {
      if (error) return next({ message: error });

      if (result.length > 0) return next({ message: `${name} service already exists!` });

      db.query(
        sql, [name, description, price, points], (error2: QueryError, result2: RowDataPacket[]) => {
          if (error2) return next({ message: error2 });
          res.status(200).json({message: `Service ${name} has been created successfully!`});
          next();
        }
      );

    }
  );

};


// Delete service as an Admin
export const deleteService = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {

  const serviceId = req.params.id;

  if (!serviceId) return next({ message: "Please send the service id to delete!" });

  const sql = `delete from service where service_id = ?`;
  const checkExistSql = `select * from service where service_id = ?`;


  db.query(
    checkExistSql, [serviceId], (error: QueryError, result: RowDataPacket[]) => {
      if (error) return next({ message: error });

      if (result.length <= 0) return next({ message: `No service exists for the provided id!` });

      db.query(
        sql, [serviceId], (error2: QueryError, result2: RowDataPacket[]) => {
          if (error2) return next({ message: error2 });
          res.status(200).json({message: `Service ${result[0].name} has been deleted successfully!`});
          next();
        }
      );

    }
  );

};
