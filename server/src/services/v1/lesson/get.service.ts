import mongoose from "mongoose";
import {checkObjectID} from "@src/lib/index.js";
import LessonModel from "@models/Lesson.model.js";
import {lessonProjectStage, createPipelineStage} from "@src/aggregations/index.js";

interface CheckLessonParams {
    data?: {
        title?: string;
        course?: string;
    };
    id?: string;
}

/** check one lesson */
export async function checkLessonExist(
    {
        id,
        data,
    }: CheckLessonParams = {}
) {
    /** check id */
    if (id) {
        const checkInvalidID = checkObjectID(id);
        if (checkInvalidID) return checkInvalidID;
    }

    if (
        id === undefined
        && data?.title === undefined
        && data?.course === undefined
    ) {
        const lessonStage = createPipelineStage({
            stage: lessonProjectStage,
        });

        const lessonExist = await LessonModel.aggregate(lessonStage);
        if (lessonExist) return lessonExist;
    }

    const filterLessonStage = createPipelineStage({
        stage: lessonProjectStage,
        filter: [{title: data?.title}, {course: new mongoose.Types.ObjectId(data?.course)}, {_id: id}]
    });

    const lessonExist = await LessonModel.aggregate(filterLessonStage);
    if (lessonExist) return lessonExist;

    return null;
}