import express from "express";
import {UserRole} from "@src/types/index.js";
import * as middleware from "@middleware/index.js";
import * as lessonController from "@controllers/v1/lesson/index.js";
import {getRegexForIgnoreRoutes, type IgnoredRoutesKeys} from "@utils/route.js";

const lessonRouter = express.Router();

const getOneLessonRegex: RegExp = getRegexForIgnoreRoutes("/course/([^/]+)/lesson/([^/]+)$");

/** ignore this route in protected route */
const ignoreRoutes: IgnoredRoutesKeys[] = [
    {method: "GET", path: getOneLessonRegex},
];

/** set global middleware */
lessonRouter.use(
    middleware.checkAccessToken(ignoreRoutes),
    middleware.checkBanned(ignoreRoutes)
);

/** delete and get one lesson */
lessonRouter
    .route("/:id")
    .get(
        lessonController.get
    )
    .delete(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("lesson"),
        lessonController.deleteController
    );

export {lessonRouter};