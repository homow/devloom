import {
    banUserController,
    changeRoleController,
    deleteUserController,
    getUsersController,
    loginController,
    refreshController,
    signUpController
} from "@controllers/v1/index.js";
import express from 'express';
import {UserRole} from "@src/types/index.js";
import checkRole from "@middleware/checkRole.js";
import isValidParamId from "@middleware/isValidParamId.js";
import checkAccessToken from "@middleware/checkAccessToken.js";
import checkBannedInBody from "@middleware/checkBannedInBody.js";
import {validateRequestBody} from "@middleware/validateRequestBody.js";
import {BaseUserSchema, ChangeRoleSchema, LoginSchema, UserSchema} from "@validators/user.js";

const authRouter = express.Router();
authRouter.use(checkAccessToken);

authRouter
    .route("/signup")
    .post(
        validateRequestBody(UserSchema),
        checkBannedInBody(),
        signUpController
    );

authRouter
    .route("/login")
    .post(
        validateRequestBody(LoginSchema),
        checkBannedInBody(),
        loginController
    );

authRouter
    .route("/refresh")
    .post(
        refreshController
    );

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