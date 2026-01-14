import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

export const LessonSchema = z.object({
    title: z.string().min(3),
    free: z.boolean().default(false),
    time: z.string().min(1),
    video: z.string().min(1),
    course: checkZodObjectId("course"),
}).overwrite(data => {
    return {
        title: data.title.trim(),
        time: data.time.trim(),
        video: data.video.trim(),
        free: data.free,
        course: data.course,
    };
});

export type LessonInput = z.infer<typeof LessonSchema>;