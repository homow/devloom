import z from "zod";

export const CategorySchema = z.object({
    title: z.string().min(2).max(20),
    href: z.string(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;