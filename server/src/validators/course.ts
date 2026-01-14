import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

export const CourseSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    price: z.number().min(0),
    discount: z.number().min(0),
    cover: z.string(),
    support: z.string(),
    href: z.string(),
    teacher: checkZodObjectId("teacher"),
    category: checkZodObjectId("category"),
    status: z.enum(["completed", "forward sale", "in progress"]),
});

export type CourseInput = z.infer<typeof CourseSchema>;