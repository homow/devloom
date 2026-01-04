import z from "zod";

export const UserSchema = z.object({
    name: z
        .string()
        .min(3, {message: "name must be at least 3 characters"})
        .max(10, {message: "name must be less than 10 characters"})
        .optional(),
    username: z
        .string()
        .min(3, {message: ""}),
    password: z
        .string()
        .min(6),
    email: z.email(),
});

export type InputUser = z.infer<typeof UserSchema>;