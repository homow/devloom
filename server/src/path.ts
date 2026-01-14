import path from "node:path";

// create a path form root project
export function createPath(inputPath: string): string {
    return path.join(process.cwd(), inputPath);
}