import express from "express";
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import type {IgnoredRoutesKeys} from "@utils/route.js";
import * as categoryController from "@controllers/v1/category/index.js";

const categoryRoute = express.Router();

const ignoreRoutes: IgnoredRoutesKeys[] = [
    {method: "GET", path: "/category"},
];

categoryRoute.use(middleware.checkAccessToken(ignoreRoutes), middleware.checkBanned(ignoreRoutes));

categoryRoute
    .route("/")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.validateRequestBody(validator.CategorySchema),
        categoryController.create
    )
    .get(categoryController.get);

categoryRoute
    .route("/:id")
    .put(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("category"),
        middleware.validateRequestBody(validator.EditCategorySchema),
        categoryController.edit
    )
    .delete(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("category"),
        categoryController.deleteCategory
    )
    .get(
        middleware.isValidParamId("category"),
        categoryController.get
    );

export {categoryRoute};