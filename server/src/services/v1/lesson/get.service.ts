import mongoose from "mongoose";
import {checkObjectID} from "@src/lib/index.js";
import LessonModel from "@models/Lesson.model.js";
import type {ServiceResponse} from "@src/types/index.js";
import {lessonProjectStage, createPipelineStage} from "@src/aggregations/index.js";

/** get all lessons from one course */
export async function getServices(
    courseID: string,
): Promise<ServiceResponse> {
    /** find all lessons from course with Pipeline */
    const lessonsPipelineStages = createPipelineStage({
        stage: lessonProjectStage,
        filter: [{course: new mongoose.Types.ObjectId(courseID)}]
    });
    const lessons = await LessonModel.aggregate(lessonsPipelineStages);

    /** if not found lesson */
    if (!lessons || lessons.length === 0) return {
        status: 404,
        data: {
            ok: false,
            message: "this course no have lessons",
            code: "NOT_FOUND_LESSONS",
        }
    };

    /** find lessons and return response */
    return {
        status: 200,
        data: {
            ok: true,
            message: "lessons successfully found",
            lessons,
        }
    };
}

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

    const [lessonExist] = await LessonModel.aggregate(filterLessonStage);
    if (lessonExist) return lessonExist;

    return null;
}