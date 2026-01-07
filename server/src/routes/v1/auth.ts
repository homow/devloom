import {
    banUserController, changeRoleController,
    deleteUserController,
    getUsersController,
    loginController,
    signUpController
} from "@controllers/v1/index.js";
import express from 'express';
import {UserRole} from "@src/types/index.js";
import checkRole from "@middleware/checkRole.js";
import checkBanned from "@middleware/checkBanned.js";
import isValidParamId from "@middleware/isValidParamId.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";
import {BaseUserSchema, ChangeRoleSchema, LoginSchema, UserSchema} from "@validators/user.js";

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
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(BaseUserSchema),
        checkBanned("The user is currently banned."),
        banUserController
    );

authRouter
    .route("/users")
    .get(
        checkAccessToken,
        checkRole({requiredRole: UserRole.ADMIN}),
        getUsersController
    );

authRouter
    .route("/user")
    .get(
        checkAccessToken,
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(BaseUserSchema),
        getUsersController
    )
    .delete(
        checkAccessToken,
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(BaseUserSchema),
        deleteUserController
    );

authRouter
    .route("/user/:id/role")
    .patch(
        checkAccessToken,
        checkRole({requiredRole: UserRole.ADMIN, comparison: "higher"}),
        isValidParamId,
        validateRequestBody(ChangeRoleSchema),
        changeRoleController
    );

export {authRouter};