import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

export const CourseUserSchema = z.object({
    course: checkZodObjectId("course"),
    user: checkZodObjectId("user"),
    price: z.number().min(0),
});

export type CourseUserInput = z.infer<typeof checkZodObjectId>;