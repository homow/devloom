import z from "zod";

export const UserSchema = z.object({
    name: z
        .string()
        .min(3, {message: "name must be at least 3 characters"})
        .max(10, {message: "name must be less than 10 characters"})
        .optional(),
    password: z
        .string()
        .min(6, {message: "password must be at least 6 characters"})
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
            {message: "password must contain at least one letter and one number"}
        ),
    email: z.email(),
});

export type InputUser = z.infer<typeof UserSchema>;