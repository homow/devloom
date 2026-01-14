import {checkObjectID} from "@src/lib/index.js";
import CourseModel from "@models/Course.model.js";
import type {CourseInput} from "@validators/course.js";
import {courseProjectStage, createPipelineStage} from "@src/aggregations/index.js";

export async function checkCourseExist(data: CourseInput, id?: string) {
    if (id) {
        const checkInvalidID = checkObjectID(id);
        if (checkInvalidID) return checkInvalidID;
    }

    const stage = createPipelineStage({
        stage: courseProjectStage,
        filter: [{title: data.title}, {href: data.href}, {_id: id}]
    });
    const [courseExist] = await CourseModel.aggregate(stage);

    if (courseExist) return courseExist;

    return null;
}