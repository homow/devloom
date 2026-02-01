import z from "zod";
import {Types} from "mongoose";

export function checkZodObjectId(
    key: string
) {
    return z.string().refine(
        value => Types.ObjectId.isValid(value),
        {error: `Invalid format id: ${key}`}
    );
}

export function formatZodError(error: z.ZodError) {
    return error?.issues?.map(i => ({
        fields: i.path.join(", "),
        message: i.message,
    }));
}