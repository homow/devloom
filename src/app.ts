import "./lib/configs/db.js";
import cors from "cors";
import {createPath} from "@lib/index.js";
import authRouter from "./routes/auth.js";
import express, {type Request, type Response} from "express";
import {validateGlobalBody} from "@middleware/validateGlobalBody.js";

const app = express();

// --- Global-cors security ---
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? "example.com" :
        `http://localhost:${process.env.PORT}`,
    credentials: true
}));

// --- Global parsers ---
app.use(express.json({
    strict: true
}));
app.use(express.urlencoded({
    extended: true
}));

// Static files (CSS, images, JS)
app.use(express.static(createPath("public")));

app.use("/api/auth", authRouter);

// --- 404 handler ---
app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        ok: false,
        message: "Not Found",
    });
});

// internal server error handler
app.use(internalServerError);

// --- Global error handler (JSON Syntax) ---
app.use(validateGlobalBody);

export default app;