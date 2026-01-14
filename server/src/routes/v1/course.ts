import express from 'express';
import {UserRole} from "@src/types/index.js";
import * as middleware from "@middleware/index.js";
import * as courseController from "@controllers/v1/course/index.js";

const courseRouter = express.Router();
courseRouter.use(
    middleware.checkAccessToken,
    middleware.checkBanned(),
    middleware.checkRole({requiredRole: UserRole.ADMIN}),
);

courseRouter
    .route("/")
    .post(
        courseController.create
    );

export {courseRouter};