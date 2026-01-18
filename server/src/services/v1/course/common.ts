import {checkObjectID} from "@src/lib/index.js";
import CourseModel from "@models/Course.model.js";
import {courseProjectStage, createPipelineStage} from "@src/aggregations/index.js";

interface CheckCourseParams {
    data?: {
        title?: string,
        href?: string
    };
    id?: string;
}

/** get course */
export async function checkCourseExist(
    {
        data,
        id
    }: CheckCourseParams
) {
    if (id) {
        const checkInvalidID = checkObjectID(id);
        if (checkInvalidID) return checkInvalidID;
    }

    /** if not exist params, return all courses */
    if (
        id === undefined
        && data?.title === undefined
        && data?.href === undefined
    ) {
        const stage = createPipelineStage({stage: courseProjectStage});
        const courseExist = await CourseModel.aggregate(stage);
        if (courseExist) return courseExist;
    }

    const stage = createPipelineStage({
        stage: courseProjectStage,
        filter: [{title: data?.title}, {href: data?.href}, {_id: id}]
    });
    const [courseExist] = await CourseModel.aggregate(stage);

    if (courseExist) return courseExist;

    return null;
}