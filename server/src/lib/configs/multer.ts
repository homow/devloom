import multer from "multer";
import path from "node:path";
import {createPath} from "@src/path.js";

const maxSize: number = Number(process.env.MULTER_MAX_SIZE_IMAGE);
const MULTER_MAX_SIZE_IMAGE: number = (maxSize || 3) * 1024 * 1024;

function createMulter(pathDir: string) {
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
            fileSize: MULTER_MAX_SIZE_IMAGE,
        },
        fileFilter: (
            _req,
            file,
            cb
        ) => {
            const allowed = /jpg|jpeg|png|webp/;
            const ext: string = path.extname(file.originalname);

            if (allowed.test(ext)) {
                cb(null, true);
            } else {
                cb(new Error("Only jpg - jpeg - png - webp"));
            }
        }
    });
}

export {createMulter};