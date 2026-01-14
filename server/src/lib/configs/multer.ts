import multer from "multer";
import path from "node:path";
import {createPath} from "@src/path.js";
import {hashSecretToken} from "@utils/crypto.js";

const maxSize: number = Number(process.env.MAX_SIZE_FILE);
const MAX_SIZE_FILE: number = (maxSize || 3) * 1024 * 1024;

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
            const filename: string = hashSecretToken(file.originalname);
            cb(null, filename);
        }
    });

    return multer({
        storage,
        limits: {
            fileSize: MAX_SIZE_FILE,
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