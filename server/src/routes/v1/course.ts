import express from 'express';
import {UserRole} from "@src/types/index.js";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import * as courseController from "@controllers/v1/course/index.js";
import * as lessonController from "@controllers/v1/lesson/index.js";
import {getRegexForIgnoreRoutes, type IgnoredRoutesKeys} from "@utils/route.js";

const courseRouter = express.Router();

const getOneCourseRegex: RegExp = getRegexForIgnoreRoutes("/course/([^/]+)$");
const getLessonRegex: RegExp = getRegexForIgnoreRoutes("/course/([^/]+)/lesson$");
const getOneLessonRegex: RegExp = getRegexForIgnoreRoutes("/course/([^/]+)/lesson/([^/]+)$");

/** ignore this route in protected route */
const ignoreRoutes: IgnoredRoutesKeys[] = [
    {method: "GET", path: "/course"},
    {method: "GET", path: getOneCourseRegex},
    {method: "GET", path: getOneLessonRegex},
    {method: "GET", path: getLessonRegex},
];

/** global middleware */
courseRouter.use(
    middleware.checkAccessToken(ignoreRoutes),
    middleware.checkBanned(ignoreRoutes),
);

/**
 * root route
 * for created, delete, update
 */
courseRouter
    .route("/")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.courseCoverUploader({
            pathDir: "courses/cover",
            fileFieldName: "cover",
            otherDataFieldName: "courseData",
            schema: validator.CourseSchema
        }),
        courseController.create
    )
    .get(courseController.get);

courseRouter
    .route("/:courseHref")
    .get(courseController.get);

courseRouter
    .route("/:id")
    .delete(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("course"),
        courseController.deleteController
    );

/** create lesson in a course */
courseRouter.route("/:id/lesson")
    .post(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("course"),
        middleware.validateRequestBody(validator.LessonSchema),
        lessonController.create
    );

/** get one lesson with id */
courseRouter
    .route("/:courseHref/lesson/:lessonID")
    .get(lessonController.get);

/** get all lessons from one course */
courseRouter
    .route("/:courseHref/lesson")
    .get(lessonController.get);

export {courseRouter};