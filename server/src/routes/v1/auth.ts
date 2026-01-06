import {
    banUserController,
    deleteUserController,
    getUsersController,
    loginController,
    signUpController
} from "@controllers/v1/index.js";

import {
    BanUserSchema,
    BaseUserSchema,
    LoginSchema,
    UserSchema
} from "@validators/user.js";
import express from 'express';
import isAdmin from "@middleware/isAdmin.js";
import checkBanned from "@middleware/checkBanned.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

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

authRouter
    .route("/users")
    .get(
        checkAccessToken,
        isAdmin,
        getUsersController
    );

authRouter
    .route("/user")
    .get(
        checkAccessToken,
        isAdmin,
        validateRequestBody(BaseUserSchema),
        getUsersController
    )
    .delete(
        checkAccessToken,
        isAdmin,
        validateRequestBody(BaseUserSchema),
        deleteUserController
    );

export {authRouter};