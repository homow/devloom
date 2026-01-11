import express, {type Response, type Request} from "express";

const categoryRoute = express.Router();

categoryRoute
    .route("/")
    .get((_req: Request, res: Response) => {
        return res.status(200).json({
            success: true,
            message: "Category route was successfully"
        });
    });

export {categoryRoute};