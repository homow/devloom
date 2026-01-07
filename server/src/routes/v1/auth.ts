import {
    banUserController,
    deleteUserController,
    getUsersController,
    loginController,
    signUpController
} from "@controllers/v1/index.js";
import express from 'express';
import {UserRole} from "@src/types/index.js";
import checkRole from "@middleware/checkRole.js";
import checkBanned from "@middleware/checkBanned.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";
import {BaseUserSchema, LoginSchema, UserSchema} from "@validators/user.js";

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
        checkRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
        validateRequestBody(BaseUserSchema),
        checkBanned("The user is currently banned."),
        banUserController
    );

authRouter
    .route("/users")
    .get(
        checkAccessToken,
        checkRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
        getUsersController
    );

authRouter
    .route("/user")
    .get(
        checkAccessToken,
        checkRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
        validateRequestBody(BaseUserSchema),
        getUsersController
    )
    .delete(
        checkAccessToken,
        checkRole([UserRole.ADMIN, UserRole.SUPER_ADMIN]),
        validateRequestBody(BaseUserSchema),
        deleteUserController
    );

export {authRouter};