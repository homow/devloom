import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerRouter = express.Router();

const swaggerDocument = swaggerJsDoc({
    apis: [
        "/src/app.ts",
    ],
    swaggerDefinition: {
        info: {
            title: "Devloom - Programming Education",
            description: "Devloom is a modular, scalable API designed for building a modern programming education platform.",
            version: "1.0.0",
        },
    },
});

const swaggerOptions = {};

const swaggerUiDoc = swaggerUi.setup(swaggerDocument, {
    customCssUrl: "/static/css/style.css",
});

swaggerRouter.use("/api-docs", swaggerUi.serve, swaggerUiDoc);
swaggerRouter.get(swaggerUiDoc);