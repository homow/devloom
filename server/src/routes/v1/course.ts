import express from 'express';

const courseRouter = express.Router();

courseRouter
    .route("/")
    .get((_req: express.Request, res: express.Response) => {
        return res.status(200).json({
            ok: true,
            message: "Welcome Back!",
        });
    });

export {courseRouter};