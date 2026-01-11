import express from 'express';
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/user.js";
import * as middleware from "@middleware/index.js";
import * as authController from "@controllers/v1/auth/index.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

const authRouter = express.Router();
authRouter.use(middleware.checkAccessToken(), middleware.checkBanned());

authRouter
    .route("/signup")
    .post(
        validateRequestBody(validator.UserSchema),
        middleware.checkBannedInBody("You cannot sign up because this email is banned. Please contact support if you believe this is an error."),
        authController.signUp
    );

authRouter
    .route("/login")
    .post(
        validateRequestBody(validator.LoginSchema),
        middleware.checkBannedInBody("This account is banned. Login is not allowed. Please contact support if you think this is a mistake."),
        authController.login
    );

authRouter
    .route("/getMe")
    .get(authController.getMe);

authRouter
    .route("/logout")
    .post(authController.logout);

authRouter
    .route("/refresh")
    .post(authController.refresh);

authRouter
    .route("/banUser")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        middleware.checkBannedInBody("The user is currently banned."),
        authController.banUser
    );

authRouter
    .route("/users")
    .get(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        authController.getUsers
    );

authRouter
    .route("/user")
    .get(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        authController.getUsers
    )
    .delete(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        authController.deleteUser
    )
    .patch(
        validateRequestBody(validator.UpdateUserSchema),
        authController.updateUser
    );

authRouter
    .route("/user/:id/role")
    .patch(
        middleware.checkRole({requiredRole: UserRole.ADMIN, comparison: "higher"}),
        middleware.isValidParamId,
        validateRequestBody(validator.ChangeRoleSchema),
        authController.changeRole
    );

export {authRouter};