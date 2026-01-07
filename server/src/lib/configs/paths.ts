import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// create a path form project root
export function createPath(inputPath: string): string {
    const rootPath: string = path.resolve(__dirname, "../../..");
    return path.join(rootPath, inputPath);
}