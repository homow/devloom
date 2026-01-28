import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {CommentInput} from "@validators/comment.js";
import {createService} from "@services/v1/comment/index.js";

export async function create(
    req: AuthRequest<{}, {}, CommentInput>,
    res: Response
) {
    const {writer, course, isReply, isConfirm, score, parentComment, body} = req.body;
    const result = await createService({writer, course, isReply, isConfirm, score, parentComment, body});
    return res.status(result.status).json(result.data);
}