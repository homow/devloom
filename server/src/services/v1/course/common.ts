import {checkObjectID} from "@src/lib/index.js";
import CourseModel from "@models/Course.model.js";
import {courseProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export async function checkCourseExist(
    data?: {
        title: string,
        href: string
    },
    id?: string
) {
    if (id) {
        const checkInvalidID = checkObjectID(id);
        if (checkInvalidID) return checkInvalidID;
    }

    if (
        id === undefined
        && data?.title === undefined
        && data?.href === undefined
    ) return null;

    const stage = createPipelineStage({
        stage: courseProjectStage,
        filter: [{title: data?.title}, {href: data?.href}, {_id: id}]
    });
    const [courseExist] = await CourseModel.aggregate(stage);

    if (courseExist) return courseExist;

    return null;
}