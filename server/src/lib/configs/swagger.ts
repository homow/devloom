import type {Express} from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const configSwagger = (app: Express) => {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            info: {
                title: "Devloom - Programming Education",
                description: "Devloom is a modular, scalable API designed for building a modern programming education platform.",
                version: "1.0.0",
            }
        },
    });

    const swaggerUiDoc = swaggerUi.serveFiles(swaggerDocument);
    app.use("/api-docs", swaggerUi.serve, swaggerUiDoc);
};

export {configSwagger};