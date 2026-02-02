import z from "zod";
import {UserRole} from "@src/types/index.js";
import {checkZodObjectId} from "@src/lib/index.js";

// <=== Signup Schema ===>

export const UserSchema = z.object({
    name: z
        .string()
        .min(3, {error: "name must be at least 3 characters"})
        .max(20, {error: "name must be less than 20 characters"})
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
    id: checkZodObjectId("user").optional()
}).refine(
    data => data.email || data.id,
    {
        error: "Either 'email' or 'id' must be provided",
        path: ["email", "id"],
    }
);

export type BaseUserInput = z.infer<typeof BaseUserSchema>;

// <=== ChangeRole Schema ===>

export const ChangeRoleSchema = z.object({
    role: z.enum([UserRole.ADMIN, UserRole.USER] as const),
});

export type ChangeRoleInput = z.infer<typeof ChangeRoleSchema>;

// <=== UpdateUser Schema ===>

export const UpdateUserSchema = z.object({
    name: UserSchema.shape.name.optional(),
    password: UserSchema.shape.password.optional()
}).refine(
    data => data.name || data.password,
    {
        error: "At least one of 'name' or 'password' must be provided",
        path: ["name", "password"],
    }
).overwrite(data => {
        return {
            name: data.name?.trim(),
            password: data.password,
        };
    }
);

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

// <=== refine ===>

UserSchema.overwrite(data => {
        return {
            name: data.name?.trim(),
            password: data.password,
            email: data.email,
        };
    }
);