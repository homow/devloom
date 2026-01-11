import type {Response} from "express";
import type {AuthRequest} from "@src/types/index.js";
import type {CategoryInput} from "@validators/category.js";

export async function create(
    req: AuthRequest<{}, {}, CategoryInput>,
    res: Response
) {
    const {title, href} = req.body;

    return res.status(200).json({
        status: "success",
        message: "Successfully created"
    });
}