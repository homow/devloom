import dotenv from "dotenv";
import {createPath} from "./paths.js";

const envPath: string = createPath(".env");

dotenv.config({path: envPath, quiet: true});