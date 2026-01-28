import express from "express";
import * as middleware from "@middleware/index.js";
import type {IgnoredRoutesKeys} from "@utils/route.js";

const commentRouter = express.Router();

const ignoredRoutes: IgnoredRoutesKeys[] = [
    {method: 'GET', path: '/comment'}
];

commentRouter.use(middleware.checkAccessToken(ignoredRoutes), middleware.checkBanned(ignoredRoutes));

commentRouter
    .route("/")
    .post();

export {commentRouter};