import {
    BaseUserSchema,
    ChangeRoleSchema,
    LoginSchema,
    UpdateUserSchema,
    UserSchema
} from "@validators/user.js";
import {
    banUserController,
    changeRoleController,
    deleteUserController,
    getUsersController,
    loginController,
    logoutController,
    refreshController,
    signUpController,
    updateUserController
} from "@controllers/v1/index.js";
import express from 'express';
import {UserRole} from "@src/types/index.js";
import checkRole from "@middleware/checkRole.js";
import checkBanned from "@middleware/checkBanned.js";
import isValidParamId from "@middleware/isValidParamId.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import checkBannedInBody from "@middleware/checkBannedInBody.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";

const authRouter = express.Router();
authRouter.use(checkAccessToken, checkBanned());

authRouter
    .route("/signup")
    .post(
        validateRequestBody(UserSchema),
        checkBannedInBody("You cannot sign up because this email is banned. Please contact support if you believe this is an error."),
        signUpController
    );

authRouter
    .route("/login")
    .post(
        validateRequestBody(LoginSchema),
        checkBannedInBody("This account is banned. Login is not allowed. Please contact support if you think this is a mistake."),
        loginController
    );

authRouter
    .route("/getMe")
    .get(getMeController);

authRouter
    .route("/logout")
    .post(logoutController);

authRouter
    .route("/refresh")
    .post(refreshController);

authRouter
    .route("/banUser")
    .post(
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(BaseUserSchema),
        checkBannedInBody("The user is currently banned."),
        banUserController
    );

authRouter
    .route("/users")
    .get(
        checkRole({requiredRole: UserRole.ADMIN}),
        getUsersController
    );

authRouter
    .route("/user")
    .get(
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(BaseUserSchema),
        getUsersController
    )
    .delete(
        checkRole({requiredRole: UserRole.ADMIN}),
        validateRequestBody(BaseUserSchema),
        deleteUserController
    )
    .patch(
        validateRequestBody(UpdateUserSchema),
        updateUserController
    );

authRouter
    .route("/user/:id/role")
    .patch(
        checkRole({requiredRole: UserRole.ADMIN, comparison: "higher"}),
        isValidParamId,
        validateRequestBody(ChangeRoleSchema),
        changeRoleController
    );

export {authRouter};