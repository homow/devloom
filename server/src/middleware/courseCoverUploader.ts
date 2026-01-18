import z from "zod";
import fs from "node:fs";
import type {CourseInput} from "@validators/course.js";
import type {NextFunction, Request, Response} from "express";
import {checkCourseExist} from "@services/v1/course/index.js";
import {createMulter, formatZodError} from "@src/lib/index.js";

const allowedFiles = /jpg|jpeg|png|webp/;
const maxSize: number = Number(process.env.MULTER_MAX_SIZE_IMAGE);
const MULTER_MAX_SIZE_IMAGE: number = (maxSize || 2) * 1024 * 1024;

interface UploaderOptions {
    pathDir: string;
    schema: z.ZodTypeAny;
    fileFieldName: string;
    otherDataFieldName: string;
}

export function courseCoverUploader(
    {
        schema,
        pathDir,
        fileFieldName,
        otherDataFieldName,
    }: UploaderOptions
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const multerUploader = createMulter({pathDir, maxSize: MULTER_MAX_SIZE_IMAGE, limitFiles: allowedFiles});

        multerUploader.single(fileFieldName)(req, res, async (err) => {
            const file = req.file; // save file

            /** check body */
            const body = JSON.parse(req.body[otherDataFieldName]);
            const result = schema.safeParse(body);

            /** return if invalid body */
            if (!result.success) {
                /**
                 * delete cover if invalid body
                 */
                try {
                    fs.rmSync(`public/uploads/${pathDir}/${file?.filename}`);
                } catch (e) {
                    console.log(e);
                }

                return res.status(422).json({
                    ok: false,
                    errors: formatZodError(result.error),
                    message: "body is invalid"
                });
            }

            /** check exist */
            const courseExist = await checkCourseExist({
                data: {
                    title: (result.data as CourseInput).title,
                    href: (result.data as CourseInput).href,
                }
            });

            /** return and delete file if exist */
            if (courseExist) {
                /**
                 * delete cover if exist course
                 * */
                try {
                    fs.rmSync(`public/uploads/${pathDir}/${file?.filename}`);
                } catch (e) {
                    console.log(e);
                }

                return res.status(409).json({
                    ok: false,
                    message: "course already exists",
                    code: "COURSE_EXIST",
                    course: courseExist
                });
            }

            /** save valid body */
            req.body = result.data;

            /** error handling for multer */
            if (err) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        ok: false,
                        message: "File size too large, must be less than 3MB",
                        code: "LIMIT_FILE_SIZE"
                    });
                }
                return res.status(400).json({
                    ok: false,
                    message: err?.message,
                    code: err?.code,
                });
            }

            /** add filename to body */
            req.body[fileFieldName] = file?.filename;
            return next();
        });
    };
}