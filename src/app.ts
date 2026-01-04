import express from "express";
import "./lib/configs/db.js";

const app = express();

app.get("/api",
    (_req, res) => {
        return res
            .status(200)
            .json({
                ok: true,
                message: "Start Express App",
            });
    }
);

export default app;