import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

export const CommentSchema = z.object({
    body: z.string().min(3),
    writer: checkZodObjectId("user"),
    isConfirm: z.boolean().default(false),
    score: z.number().min(0).max(5).default(5),
    course: checkZodObjectId("course"),
    isReply: z.boolean().default(false),
    mainComment: checkZodObjectId("comment"),
});

export type CommentInput = z.infer<typeof CommentSchema>;