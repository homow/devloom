import express from 'express';
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import type {IgnoredRoutesKeys} from "@utils/route.js";
import * as authController from "@controllers/v1/auth/index.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

/** ignore routes */
const ignoreRoutes: IgnoredRoutesKeys[] = [
    {method: "POST", path: "/auth/refresh"},
    {method: "POST", path: "/auth/login"},
    {method: "POST", path: "/auth/logout"},
    {method: "POST", path: "/auth/signup"},
];

const authRouter = express.Router();

/** global middlewares */
authRouter.use(middleware.checkAccessToken(ignoreRoutes), middleware.checkBanned(ignoreRoutes));

/** create new user(Signup) */
authRouter
    .route("/signup")
    .post(
        validateRequestBody(validator.UserSchema),
        middleware.checkBannedInBody("You cannot sign up because this email is banned. Please contact support if you believe this is an error."),
        authController.signUp
    );

/** login user */
authRouter
    .route("/login")
    .post(
        validateRequestBody(validator.LoginSchema),
        middleware.checkBannedInBody("This account is banned. Login is not allowed. Please contact support if you think this is a mistake."),
        authController.login
    );

/** get safe-information user */
authRouter
    .route("/getMe")
    .get(authController.getMe);

/** logout */
authRouter
    .route("/logout")
    .post(authController.logout);

/** refresh accessToken */
authRouter
    .route("/refresh")
    .post(authController.refresh);

/** banned user */
authRouter
    .route("/ban")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        middleware.checkBannedInBody("The user is currently banned."),
        authController.ban
    );

/** get all users */
authRouter
    .route("/users")
    .get(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        authController.get
    );

/**
 * 1. get one user
 * 2. delete one user
 * 3. update information user
 */
authRouter
    .route("/user")
    .get(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        authController.get
    )
    .delete(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        authController.deleteUser
    )
    .patch(
        validateRequestBody(validator.UpdateUserSchema),
        authController.update
    );

/** update user role */
authRouter
    .route("/user/:id/role")
    .patch(
        middleware.checkRole({requiredRole: UserRole.ADMIN, comparison: "higher"}),
        middleware.isValidParamId("user"),
        validateRequestBody(validator.ChangeRoleSchema),
        authController.changeRole
    );

export {authRouter};