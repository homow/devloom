import {
    banUserController,
    loginController,
    signUpController
} from "@controllers/v1/index.js";
import express from 'express';
import isAdmin from "@middleware/isAdmin.js";
import checkBanned from "@middleware/checkBanned.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";
import {BanUserSchema, LoginSchema, UserSchema} from "@validators/user.js";

const authRouter = express.Router();

authRouter
    .route("/signup")
    .post(
        validateRequestBody(UserSchema),
        checkBanned(),
        signUpController
    );

authRouter
    .route("/login")
    .post(
        validateRequestBody(LoginSchema),
        checkBanned(),
        loginController
    );

authRouter
    .route("/banUser")
    .post(
        checkAccessToken,
        isAdmin,
        validateRequestBody(BanUserSchema),
        checkBanned("The user is currently banned."),
        banUserController
    );

export {authRouter};