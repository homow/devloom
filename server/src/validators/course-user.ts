import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

export const CourseUserSchema = z.object({
    course: checkZodObjectId("course"),
});

export type CourseUserInput = z.infer<typeof checkZodObjectId>;