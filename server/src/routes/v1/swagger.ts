import express from "express";
import swaggerJson from "@docs/swagger.json" with {type: "json"};
import swaggerUi, {type SwaggerUiOptions} from "swagger-ui-express";

const swaggerRouter = express.Router();

const swaggerOptions: SwaggerUiOptions = {
    customCssUrl: "/static/css/style.css",
};

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerJson, swaggerOptions));

export {swaggerRouter};