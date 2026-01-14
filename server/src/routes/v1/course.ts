import express from 'express';

const courseRouter = express.Router();

courseRouter
    .route("/")
    .get();

export {courseRouter};