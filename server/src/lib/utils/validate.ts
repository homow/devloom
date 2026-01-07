import z from "zod";
import {Types} from "mongoose";

export function checkZodObjectId(
    message: string = ""
) {
    return z.string().refine(
        value => Types.ObjectId.isValid(value),
        {error: `Invalid ${message} id`}
    );
}

export function formatZodError(error: z.ZodError) {
    return error?.issues?.map(i => ({
        fields: i.path.join(", "),
        message: i.message,
    }));
}