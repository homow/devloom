import express from "express";
import "./lib/configs/db.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use("/api/auth", authRouter);

export default app;