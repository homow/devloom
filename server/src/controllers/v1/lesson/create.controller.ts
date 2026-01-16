import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {LessonInput} from "@validators/lesson.js";
import {createService} from "@services/v1/lesson/index.js";

export async function create(
    req: AuthRequest<{ id: string }, {}, LessonInput>,
    res: Response
) {
    const {id} = req.params;
    const result = await createService(id, req.body);
    return res.status(result.status).json(result.data);
}