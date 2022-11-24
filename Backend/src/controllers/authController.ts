import * as jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";

import IUser from "../interfaces/IUser";
import {QueryError, RowDataPacket} from "mysql2";

const jwtDecode = require("jwt-decode");
const db = require("../database/db_config");
const regexLib = require("../util/regexLibrary");

const jwt_expiration = "183d";
const jwt_refresh_expiration = "1y";

// Token gen
const generateToken = (user: IUser, secret: string, expiration: string) => {
    return jwt.sign(user, secret, {expiresIn: expiration});
};

//TODO: Sign in user (JWT)
export const signIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return next({ message: "Username and password required!" });

        const sql = `select * from users Where username = ?`;
        //@ts-ignore
        db.query(
            sql,
            [username.toString().toLowerCase()],
            async (error: QueryError, results: RowDataPacket[]) => {
                if (error) return next(error);
                if (results.length !== 1)
                    return next({message: "Please check your username or password!"});

                const isValidPassword = await bcrypt.compare(
                    password,
                    results[0].password
                );

                if (!isValidPassword)
                    return next({message: "Please check your username or password!"});

                const currentUser: IUser = {
                    user_id: results[0].user_id,
                    email: results[0].email,
                    username: results[0].username,
                    firstname: results[0].firstname,
                    lastname: results[0].lastname,
                    city: results[0].city,
                    role: results[0].role,
                    phone: results[0].phone,
                    address: results[0].address,
                    zip: results[0].zip,
                    state: results[0].state
                };

                //@ts-ignore
                const token = generateToken(
                    currentUser,
                    //@ts-ignore
                    process.env.JWT_SECRET,
                    jwt_expiration
                );
                //@ts-ignore
                const refreshToken = generateToken(
                    currentUser,
                    //@ts-ignore
                    process.env.JWT_REFRESH_SECRET,
                    jwt_refresh_expiration
                );
                // Insert refresh token into the database for the current user
                const sqlTokenQuery = `insert into token_records (user_id, refresh_token) values (?, ?)`;

                db.query(
                    sqlTokenQuery,
                    [currentUser.user_id, refreshToken],
                    (err: QueryError, result: RowDataPacket[]) => {
                        if (err) return next(err);
                        // res.cookie("jwt", refreshToken, {
                        //     httpOnly: true,
                        //     maxAge: 24 * 60 * 60 * 1000,
                        // });
                        res.status(200).json({
                           // token: token,
                            refreshToken: refreshToken
                        });
                        next();
                    }
                );
            }
        );
    } catch (e) {
        next(e);
    }
};

// TODO: Generate new access token from refresh
export const refreshTokenSignIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
     // const refreshToken = req.cookies.jwt;
     const refreshToken = req.body.refreshToken;

    try {
        // Check if the refresh token is not null
        if (!refreshToken)
            return res.status(401).json({message: "No token provided!"});
      //  console.log(refreshToken);

        const sql = `select * from token_records where refresh_token = '${refreshToken}'`;
        // Check if there is such refresh token for the current user
        db.query(
            sql,
            [refreshToken],
            (err: QueryError, result: RowDataPacket[]) => {
                if (err) return next(err);
                if (result.length === 0)
                    return res.status(403).json({message: "You don't have access"});
                //@ts-ignore
                jwt.verify(
                    refreshToken,
                    //@ts-ignore
                    process.env.JWT_REFRESH_SECRET,
                    (err2: VerifyErrors, user: JwtPayload) => {
                        if (err2) return res.status(403).json({ message: "You don't have access" });

                        const accessToken = jwt.sign(
                            {
                                user_id: user.user_id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                username: user.username,
                                email: user.email,
                                phone: user.phone,
                                address: user.address,
                                city: user.city,
                                state: user.state,
                                zip: user.zip,
                                role: user.role,
                            },
                            //@ts-ignore
                            process.env.JWT_SECRET
                        );
                        res.status(200).json({accessToken: accessToken});
                        next();
                    }
                );
            }
        );
    } catch (e) {
        console.log(e);
        next();
    }
};

// Delete refresh token
export const logoutSpecificDevice = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    // delete refresh token from  db
    // const refreshToken = req.cookies.jwt;
    const refreshToken = req.body.refreshToken;

   // const token = req.headers.authorization;

    if (!refreshToken) return res.status(204).json({});

    const sql = `select * from token_records where refresh_token = '${refreshToken}'`;

    try {
        db.query(sql, (error: QueryError, result: RowDataPacket[]) => {
            if (error) return next({message: error});
            if (result.length === 0) return next({message: "Record not found!!!"});

            const deleteTokenSql = `delete from token_records where refresh_token = '${refreshToken}'`;
            db.query(deleteTokenSql, (err2: QueryError, result2: RowDataPacket[]) => {
                if (err2) return next({ message: err2 });
                res.clearCookie('jwt');
              //  res.status(200).json({message: `successfully logged out`});
                next();
            });
        });
    } catch (e) {
        next(e);
    }
};

// Delete all refresh tokens
export const logoutAllDevices = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {



    try {
        const deleteTokenSql = `delete from token_records where user_id = ?`;
        //@ts-ignore
        db.query(deleteTokenSql, [req.user.user_id], (err2: QueryError, result2: RowDataPacket[]) => {
            if (err2) return next({message: err2});
            res.status(204).json({message: `successfully logged out on all your devices`});
            next();
        });
    } catch (e) {
        next(e);
    }
};

// Sign up and login after
export const signUp = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const {firstname, lastname, username, email, password, repeat_password, address, city, zip, state, phone} = req.body;

    try {
        const emailRegex = regexLib.emailRegex;
        const phoneRegex = regexLib.phoneRegex;
        const passwordRegex = regexLib.passwordValidationRegex;

        if (
            !firstname ||
            !lastname ||
            !email ||
            !username ||
            !password ||
            !repeat_password ||
            !city ||
            !phone ||
            !address ||
            !state ||
            !zip ||
            !passwordRegex.test(password) ||
            password.toString().length < 8 ||
            !emailRegex.test(email)
        ) {
            return next({
                message: "Please field out all your form fields!",
                errorField: {
                    email: !email
                        ? "email required!!"
                        : "" || !emailRegex.test(email)
                            ? "Invalid email address!"
                            : "",
                    password: !password
                        ? "password required!"
                        : "" || !passwordRegex.test(password)
                            ? "Invalid password! at least 1 Uppercase letter, 1 lowercase letter and 1 digit"
                            : "" || password.toString().length < 8
                                ? "Password too short! must be at least 8 characters"
                                : "",
                    repeat_password: !repeat_password ? "repeat password required!" : "",
                },
            });
        }

        if (password !== repeat_password) return next({message: "Entered passwords don't much!"});

        const sql2 = `SELECT * FROM users WHERE email =?`;
        const sqlUsername = `SELECT * FROM users WHERE username =?`;

        db.query(
            sqlUsername,
            [username.toString().toLowerCase()],
            (err: QueryError, results: RowDataPacket[]) => {
                if (err) return next(err);
                if (results.length != 0) return next({message: "Username already taken"});
            }
        );

        db.query(
            sql2,
            [email.toString().toLowerCase()],
            async (err: QueryError, results: RowDataPacket[]) => {
                if (err) return next(err);
                if (results.length != 0)
                    return next({message: "Email already taken"});

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const sql = `insert into users (firstname, lastname, username, email, password, phone, address, city, zip, state) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                db.query(
                    sql,
                    [
                        firstname.toString().toLowerCase(),
                        lastname.toString().toLowerCase(),
                        username.toString().toLowerCase(),
                        email.toString().toLowerCase(),
                        hashedPassword,
                        phone.toString(),
                        address.toString().toLowerCase(),
                        city.toString().toLowerCase(),
                        zip,
                        state.toString().toLowerCase()
                    ],
                    (error: QueryError, results: RowDataPacket[]) => {
                        if (error) return next(error);
                        res.status(200).json({message: "You have been signed up successfully"});
                        next();
                    }
                );
            }
        );
    } catch (e) {
        return next(e);
    }
};

// verifying whether the user is valid or not
export const verifyUser = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const headerToken = req.get("Authorization");
        // check whether there is a registered token or not
        if (!headerToken) return next({message: "You are not logged in!!"});
        // verifying the token validity
        // @ts-ignore
        const token = await jwt.verify(headerToken, process.env.JWT_SECRET);
        // In case the token is invalid
        if (!token)
            return res.status(403).json({message: "Invalid token provided!"});

        const jwtDecoded = await jwt.decode(headerToken);
        console.log(jwtDecoded);

        // @ts-ignore
        const sql = `select user_id, role, email, firstname, username, lastname from users where user_id=?`;
        //@ts-ignore
        db.query(
            sql,
            //@ts-ignore
            [jwtDecoded.user_id],
            (error: QueryError, results: RowDataPacket[]) => {
                if (error) return next(error);
                // if the user doesn't exist
                if (results.length !== 1)
                    return next({
                        message: "The user associated with this token no longer exists",
                    });
                // @ts-ignore
                req.user = token;
                return next();
            }
        );
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).json({message: "Invalid token provided!"});
        }
        return next(e);
    }
};

// Check whether the actual user role is allowed or not
export const checkRole = ([...roles]) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        // @ts-ignore
        try {
            // @ts-ignore
            const result: number = roles.filter(
                //@ts-ignore
                (item) => req.user.role === item
            ).length;
            result < 1
                ? next({message: "Not authorized to access this page!"})
                : next();
        } catch (e) {
            return next(e);
        }
    };
};
