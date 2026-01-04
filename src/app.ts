import express from "express";

const app = express();

app.get("/",
    (
        _req,
        res
    ) => {
        return res
            .status(200)
            .json({
                ok: true,
                message: "Start Express App",
            });
    }
);

export default app;