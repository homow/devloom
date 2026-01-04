import express from 'express';
import {signUpController} from "@src/controllers/index.js";

const authRouter = express.Router();

// authRouter
//     .route("/")
//     .get();

authRouter
    .route("/signup")
    .post(signUpController);
//
// authRouter
//     .route("/login")
//     .post();

export default authRouter;