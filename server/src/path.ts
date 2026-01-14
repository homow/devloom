import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// create a path form root project
export function createPath(inputPath: string): string {
    const isDevelopment: boolean = __dirname.slice(__dirname.length - 3) === "src";
    const rootPath: string = path.resolve(__dirname, isDevelopment ? "../" : "./");
    return path.join(rootPath, inputPath);
}