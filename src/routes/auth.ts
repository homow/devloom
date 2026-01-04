import express from 'express';

const authRouter = express.Router();

authRouter
    .route("/")
    .get();

authRouter
    .route("/signup")
    .post();

authRouter
    .route("/login")
    .post();