import multer from "multer";
import path from "node:path";
import {createPath} from "@src/path.js";

interface MulterOptionsParams {
    pathDir: string,
    maxSize: number,
    limitFiles: RegExp
}

function createMulter(
    {
        pathDir,
        maxSize,
        limitFiles,
    }: MulterOptionsParams
) {
    const storage = multer.diskStorage({
        destination: (
            _req,
            _file,
            cb
        ) => {
            cb(null, createPath(`public/uploads/${pathDir}`));
        },
        filename: (
            _req,
            file,
            cb
        ) => {
            const random: number = Math.round(Math.random() * 100);
            const filename: string = Date.now() + "_" + random + path.extname(file.originalname);

            cb(null, filename);
        }
    });

    return multer({
        storage,
        limits: {
            fileSize: maxSize,
        },
        fileFilter: (
            _req,
            file,
            cb
        ) => {
            const ext: string = path.extname(file.originalname);

            if (limitFiles.test(ext)) {
                cb(null, true);
            } else {
                cb(new Error("Only jpg - jpeg - png - webp"));
            }
        }
    });
}

export {createMulter};