import express from 'express';
import {signUpController} from "@controllers/v1/index.js";

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