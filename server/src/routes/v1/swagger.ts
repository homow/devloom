import yaml from "js-yaml";
import express from "express";
import {createPath} from "@src/path.js";
import swaggerUi, {type SwaggerUiOptions} from "swagger-ui-express";
import fs from "node:fs";

const swaggerRouter = express.Router();

const swaggerOptions: SwaggerUiOptions = {
    customCssUrl: "/static/css/style.css",
};

const swaggerYamlPath: string = createPath("src/docs/swagger.yaml");

const swaggerYamlContent = fs.readFileSync(swaggerYamlPath, "utf8");
const swaggerDocs = yaml.load(swaggerYamlContent) as object;

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerDocs, swaggerOptions));

export {swaggerRouter};