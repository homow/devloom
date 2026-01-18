import express from "express";
import {UserRole} from "@src/types/index.js";
import * as middleware from "@middleware/index.js";
import * as lessonController from "@controllers/v1/lesson/index.js";

const lessonRouter = express.Router();

lessonRouter.use(
    middleware.checkAccessToken(),
    middleware.checkBanned()
);

lessonRouter
    .route("/:id")
    .delete(
        middleware.checkRole({requiredRole: UserRole.ADMIN}),
        middleware.isValidParamId("lesson"),
        lessonController.deleteController
    );

export {lessonRouter};