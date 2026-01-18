import z from "zod";
import {CourseStatus} from "@src/types/index.js";
import {checkZodObjectId} from "@src/lib/index.js";

export const CourseSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    price: z.number().min(0),
    discount: z.number().min(0),
    support: z.string(),
    href: z.string().regex(/^\s*[a-zA-Z0-9_-]+\s*$/),
    teacher: checkZodObjectId("teacher"),
    category: checkZodObjectId("category"),
    status: z.enum(CourseStatus),
}).overwrite(data => {
    return {
        title: data.title.trim(),
        description: data.description.trim(),
        support: data.support.trim(),
        href: data.href.trim(),
        price: data.price,
        discount: data.discount,
        teacher: data.teacher,
        category: data.category,
        status: data.status,
    };
});

export type CourseInput = z.infer<typeof CourseSchema>;