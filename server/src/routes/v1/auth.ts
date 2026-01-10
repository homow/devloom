import express from 'express';
import {UserRole} from "@src/types/index.js";
import checkRole from "@middleware/checkRole.js";
import * as validator from "@validators/user.js";
import checkBanned from "@middleware/checkBanned.js";
import * as authController from "@controllers/v1/index.js";
import isValidParamId from "@middleware/isValidParamId.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import checkBannedInBody from "@middleware/checkBannedInBody.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

const authRouter = express.Router();
authRouter.use(checkAccessToken, checkBanned());

authRouter
    .route("/signup")
    .post(
        validateRequestBody(validator.UserSchema),
        checkBannedInBody("You cannot sign up because this email is banned. Please contact support if you believe this is an error."),
        authController.signUpController
    );

authRouter
    .route("/login")
    .post(
        validateRequestBody(validator.LoginSchema),
        checkBannedInBody("This account is banned. Login is not allowed. Please contact support if you think this is a mistake."),
        authController.loginController
    );

authRouter
    .route("/getMe")
    .get(authController.getMeController);

authRouter
    .route("/logout")
    .post(authController.logoutController);

authRouter
    .route("/refresh")
    .post(authController.refreshController);

authRouter
    .route("/banUser")
    .post(
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        checkBannedInBody("The user is currently banned."),
        authController.banUserController
    );

authRouter
    .route("/users")
    .get(
        checkRole({requiredRole: UserRole.ADMIN}),
        authController.getUsersController
    );

authRouter
    .route("/user")
    .get(
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        authController.getUsersController
    )
    .delete(
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(validator.BaseUserSchema),
        authController.deleteUserController
    )
    .patch(
        validateRequestBody(validator.UpdateUserSchema),
        authController.updateUserController
    );

authRouter
    .route("/user/:id/role")
    .patch(
        checkRole({requiredRole: UserRole.ADMIN, comparison: "higher"}),
        isValidParamId,
        validateRequestBody(validator.ChangeRoleSchema),
        authController.changeRoleController
    );

export {authRouter};