import cors from "cors";
import "./lib/configs/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import {createPath} from "@lib/index.js";
import {authRouter} from "@routes/v1/auth.js";
import notFoundHandler from "@middleware/notFoundHandler.js";
import internalServerError from "@middleware/internalServerError.js";
import {validateGlobalBody} from "@middleware/validateGlobalBody.js";

const BASE_URL: string = process.env.BASE_URL || "/api/v1";
const app = express();

const allowedOrigins: string[] = [
    `http://localhost:${process.env.PORT}`,
    "http://localhost:4173",
    "http://127.0.0.1:5173",
];

// --- Global-cors security ---
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

// --- Global parsers ---
app.use(express.json({
    strict: true
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser(process.env.JWT_SECRET));

// Static files (CSS, images, JS)
app.use(express.static(createPath("public")));

// --- Routes ---
app.use(`${BASE_URL}/auth`, authRouter);

// --- 404 handler ---
app.use(notFoundHandler);

// --- Global error handler (JSON Syntax) ---
app.use(validateGlobalBody);

// internal server error handler
app.use(internalServerError);

export default app;