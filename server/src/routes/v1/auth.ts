import {
    loginController,
    signUpController
} from "@controllers/v1/index.js";
import express from 'express';
import checkBanned from "@middleware/checkBanned.js";
import {LoginSchema, UserSchema} from "@validators/user.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

const authRouter = express.Router();

// authRouter
//     .route("/")
//     .get();

authRouter
    .route("/signup")
    .post(
        validateRequestBody(UserSchema),
        checkBanned,
        signUpController
    );

authRouter
    .route("/login")
    .post(
        validateRequestBody(LoginSchema),
        checkBanned,
        loginController
    );

export {authRouter};