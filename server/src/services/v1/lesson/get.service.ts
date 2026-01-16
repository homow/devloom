import mongoose from "mongoose";
import {checkObjectID} from "@src/lib/index.js";
import LessonModel from "@models/Lesson.model.js";
import {lessonProjectStage, createPipelineStage} from "@src/aggregations/index.js";
import type {ServiceResponse} from "@src/types/index.js";

interface CheckLessonParams {
    data?: {
        title?: string,
    };
    id?: string;
}

export async function getServices(
    courseID: string,
): Promise<ServiceResponse> {
    const lessonsPipelineStages = createPipelineStage({
        stage: lessonProjectStage,
        filter: [{course: new mongoose.Types.ObjectId(courseID)}]
    });
    const lessons = await LessonModel.aggregate(lessonsPipelineStages);

    if (!lessons || lessons.length === 0) return {
        status: 404,
        data: {
            ok: false,
            message: "this course no have lessons",
            code: "NOT_FOUND_LESSONS",
        }
    };

    return {
        status: 200,
        data: {
            ok: true,
            message: "lessons successfully found",
            lessons,
        }
    };
}

export async function checkLessonExist(
    {
        data,
        id
    }: CheckLessonParams
) {
    if (id) {
        const checkInvalidID = checkObjectID(id);
        if (checkInvalidID) return checkInvalidID;
    }

    if (
        id === undefined
        && data?.title === undefined
    ) {
        const lessonStage = createPipelineStage({
            stage: lessonProjectStage,
        });

        const [lessonExist] = await LessonModel.aggregate(lessonStage);
        if (lessonExist) return lessonExist;
    }

    const filterLessonStage = createPipelineStage({
        stage: lessonProjectStage,
        filter: [{title: data?.title}, {_id: id}]
    });

    const [lessonExist] = await LessonModel.aggregate(filterLessonStage);
    if (lessonExist) return lessonExist;

    return null;
}