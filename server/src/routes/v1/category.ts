import express from "express";
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import * as categoryController from "@controllers/v1/category/index.js";
import {getRegexForIgnoreRoutes, type IgnoredRoutesKeys} from "@utils/route.js";

const categoryRouter = express.Router();

const ignoreRouteGetCategory = getRegexForIgnoreRoutes("/category/([^/]+)$");

const ignoreRoutes: IgnoredRoutesKeys[] = [
    {method: "GET", path: "/category"},
    {method: "GET", path: ignoreRouteGetCategory},
];

categoryRouter.use(middleware.checkAccessToken(ignoreRoutes), middleware.checkBanned(ignoreRoutes));

categoryRouter
    .route("/")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.validateRequestBody(validator.CategorySchema),
        categoryController.create
    )
    .get(categoryController.get);

categoryRouter
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

/** get all courses with a category */
categoryRouter
    .route("/:href")
    .get(categoryController.getCoursesByCategory);

export {categoryRouter};