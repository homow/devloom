import express from "express";
import * as validator from "@validators/index.js";
import * as middleware from "@middleware/index.js";
import type {IgnoredRoutesKeys} from "@utils/route.js";
import * as commentController from "@controllers/v1/comment/index.js";

const commentRouter = express.Router();

const ignoredRoutes: IgnoredRoutesKeys[] = [
    {method: 'GET', path: '/comment'}
];

commentRouter.use(middleware.checkAccessToken(ignoredRoutes), middleware.checkBanned(ignoredRoutes));

commentRouter
    .route("/")
    .post(
        middleware.validateRequestBody(validator.CommentSchema),
        commentController.create
    );

export {commentRouter};