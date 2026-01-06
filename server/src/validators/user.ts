import z from "zod";

// <==== Signup Schema ===>

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

// <=== Login Schema ===>

export const LoginSchema = UserSchema.pick({
    email: true,
    password: true,
}).extend({
    remember: z.boolean().optional().default(false),
});

export type InputLogin = z.infer<typeof LoginSchema>;

// <=== BanUser Schema ===>

export const BanUserSchema = UserSchema.pick({
    email: true,
});

export type BanUserInput = z.infer<typeof BanUserSchema>;