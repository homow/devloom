import express from "express";
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import * as categoryController from "@controllers/v1/category/index.js";
import {checkRole} from "@middleware/index.js";

const categoryRoute = express.Router();

categoryRoute.use(middleware.checkAccessToken, middleware.checkBanned());

categoryRoute
    .route("/")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.validateRequestBody(validator.CategorySchema),
        categoryController.create
    )
    .get(categoryController.getAll);

categoryRoute
    .route("/:id")
    .put(
        checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("category"),
        categoryController.edit
    );

export {categoryRoute};