import z from "zod";

export const CategorySchema = z.object({
    title: z.string().min(2).max(20),
    href: z.string().min(2).max(20),
}).overwrite(
    data => {
        return {
            title: data.title.trim(),
            href: data.href.trim(),
        };
    }
);

export type CategoryInput = z.infer<typeof CategorySchema>;

export const EditCategorySchema = z.object({
    title: z.string().min(2).max(20).optional(),
    href: z.string().min(2).max(20).optional(),
}).refine(
    data => data.title || data.href,
    {
        error: "At least one of 'title' or 'href' must be provided",
        path: ["title", "href"],
    }
).overwrite(data => {
    return {
        title: data.title?.trim(),
        href: data.href?.trim(),
    };
});

export type EditCategoryInput = z.infer<typeof EditCategorySchema>;