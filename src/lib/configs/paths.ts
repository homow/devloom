import path from "node:path";

// create a path form project root
export function createPath(inputPath: string): string {
    const index: number = import.meta.dirname.indexOf("src");

    const rootPath: string = index !== -1
        ? import.meta.dirname.slice(0, index)
        : import.meta.dirname;

    return path.join(rootPath, inputPath);
}