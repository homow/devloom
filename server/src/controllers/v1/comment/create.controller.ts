import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {CommentInput} from "@validators/comment.js";
import {createService} from "@services/v1/comment/index.js";

/** created one comment */
export async function create(
    req: AuthRequest<{}, {}, CommentInput>,
    res: Response
) {
    /** get safe data */
    const {course, isReply, score, parentComment, body} = req.body;
    const writer = req.userPayload?.id as string;
    const result = await createService({writer, course, isReply, score, parentComment, body});
    return res.status(result.status).json(result.data);
}