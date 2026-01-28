import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

export const CommentSchema = z.object({
    body: z.string().min(3),
    writer: checkZodObjectId("user"),
    isConfirm: z.boolean().default(false),
    score: z.number().min(0).max(5).default(5),
    course: checkZodObjectId("course"),
    isReply: z.boolean().default(false),
    parentComment: checkZodObjectId("comment"),
}).overwrite(data => {
    return {
        body: data.body.trim(),
        writer: data.writer,
        isConfirm: data.isConfirm,
        score: data.score,
        course: data.course,
        isReply: data.isReply,
        parentComment: data.parentComment,
    };
});

export type CommentInput = z.infer<typeof CommentSchema>;