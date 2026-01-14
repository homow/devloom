import express from 'express';
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import type {IgnoredRoutesKeys} from "@utils/route.js";
import * as courseController from "@controllers/v1/course/index.js";

const courseRouter = express.Router();

const ignoreRoutes: IgnoredRoutesKeys[] = [
    {method: "GET", path: "/course"},
];

courseRouter.use(
    middleware.checkAccessToken(ignoreRoutes),
    middleware.checkBanned(ignoreRoutes),
    middleware.checkRole({requiredRole: UserRole.ADMIN}),
);

courseRouter
    .route("/")
    .post(
        middleware.validateRequestBody(validator.CourseSchema),
        courseController.create
    );

export {courseRouter};