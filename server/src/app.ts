import cors from "cors";
import "./lib/configs/db.js";
import express from "express";
import {createPath} from "./path.js";
import cookieParser from "cookie-parser";
import * as routes from "@routes/v1/index.js";
import * as middleware from "./middleware/index.js";

const app = express();
const BASE_URL: string = process.env.BASE_URL || "/api/v1";

const allowedOrigins: string[] = [
    `http://127.0.0.1:${process.env.PORT}`,
    "http://127.0.0.1:4173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    `http://localhost:${process.env.PORT}`,
    "http://localhost:4173",
    "http://localhost:5173",
    "http://localhost:5174",
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

if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET");
}

app.use(cookieParser(process.env.JWT_SECRET));

// --- Static files (CSS, images, JS) ---
app.use("/static", express.static(createPath("public")));

// --- Routes ---
app.use(`${BASE_URL}/auth`, routes.authRouter);
app.use(`${BASE_URL}/category`, routes.categoryRoute);

// --- 404 handler ---
app.use(middleware.notFoundHandler);

// --- Global error handler (JSON Syntax) ---
app.use(middleware.validateGlobalBody);

// --- internal server error handler ---
app.use(middleware.internalServerError);

export default app;