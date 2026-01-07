import z from "zod";
import {checkZodObjectId} from "@src/lib/index.js";

// <==== Signup Schema ===>

export const UserSchema = z.object({
    name: z
        .string()
        .min(3, {error: "name must be at least 3 characters"})
        .max(10, {error: "name must be less than 10 characters"})
        .optional(),
    password: z
        .string()
        .min(6, {error: "password must be at least 6 characters"})
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
            {error: "password must contain at least one letter and one number"}
        ),
    email: z.email(),
});

export type InputUser = z.infer<typeof UserSchema>;

// <=== Login Schema ===>

export const LoginSchema = UserSchema.pick({
    email: true,
    password: true,
}).extend({
    remember: z.boolean().optional().default(false),
});

export type InputLogin = z.infer<typeof LoginSchema>;

// <=== DeleteUser Schema ===>

export const BaseUserSchema = z.object({
    email: z.email().optional(),
    id: checkZodObjectId().optional()
}).refine(
    data => data.email || data.id,
    {
        error: "Either 'email' or 'id' must be provided",
        path: ["email", "id"],
    }
);

export type BaseUserInput = z.infer<typeof BaseUserSchema>;