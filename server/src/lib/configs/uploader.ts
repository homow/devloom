import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination: (
        _req,
        _file,
        cb
    ) => {
        cb(null, "./public/uploads");
    },
    filename: (
        _req,
        file,
        cb
    ) => {
        const random: number = Math.round(Math.random() * 100);
        const filename: string = Date.now().toString() + "_" + random + path.extname(file.originalname);

        cb(null, filename);
    }
});

const MAX_SIZE: number = 3 * 1024 * 1024;

const multerUploader = multer({
    storage,
    limits: {
        fileSize: MAX_SIZE,
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

export {multerUploader};