import { QueryError, RowDataPacket } from "mysql2";

const regexLib = require("../util/regexLibrary");
const db = require("../database/db_config");

import express, { NextFunction, query } from "express";

export const getUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    db.query(
      `select user_id, firstname, username, lastname, email, is_active, role, password from users where user_id=?`,
      //@ts-ignore
      [req.user.user_id],
      (error: QueryError, result: RowDataPacket[]) => {
        if (error) return next(error.message);
        res.status(200).json(result);
      }
    );
  } catch (e) {
    return next(e);
  }
};

export const getUserById = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.params.id) return next("Please send a valid id, this one is empty");

  try {
    // @ts-ignore
    db.query(
      "select user_id, firstname, lastname, username, email, is_active, role from users where user_id=?",
      [req.params.id],
      (error: QueryError, result: RowDataPacket[]) => {
        if (error) return next(error.message);
        if (result.length !== 1)
          return next("Id non associate to any user, please send a valid id!");
        res.status(200).json(result);
      }
    );
  } catch (e) {
    return next(e);
  }
};

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    db.query(
      `select user_id, firstname, lastname, email, username, is_active, role from users`,
      (error: QueryError, result: RowDataPacket[]) => {
        if (error) return next(error.message);
        res.status(200).json(result);
      }
    );
  } catch (e) {
    return next(e);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.params.id) return next({ message: "user id not provided!" });

  try {
    db.query(
      `select * from users where user_id = ?`,
      [req.params.id],
      (err: QueryError, result: RowDataPacket[]) => {
        if (err) next({ message: err });
        if (result.length <= 0)
          return next({ message: "No user has been assigned this id" });

        db.query(
          `delete from users where user_id = ?`,
          [req.params.id],
          (errorDelete: QueryError, result: RowDataPacket[]) => {
            if (errorDelete) return next(errorDelete);
            res
              .status(200)
              .json({ message: `user ${req.params.id} successfully deleted!` });
            return next();
          }
        );
      }
    );
  } catch (e) {
    return next(e);
  }
};
