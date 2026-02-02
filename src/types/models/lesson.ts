import {Types} from "mongoose";
import type {BaseDB, SafeBaseDB, SafeCourseDB} from "./index.js";

export interface LessonDB extends BaseDB {
    title: string;
    time: string;
    video: string;
    free: boolean;
    course: Types.ObjectId;
}

export type SafeLessonDB = Pick<LessonDB, "free" | "time" | "video" | "title"> & SafeBaseDB & SafeCourseDB;