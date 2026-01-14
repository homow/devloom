import type {CourseInput} from "@validators/course.js";
import type {ServiceResponse} from "@src/types/index.js";

export async function createService(
    data: CourseInput,
): Promise<ServiceResponse> {
    const {
        title,
        description,
        category,
        discount,
        href,
        status,
        support,
        teacher,
        price,
        cover
    } = data;
}