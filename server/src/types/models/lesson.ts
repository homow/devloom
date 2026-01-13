import {Types} from "mongoose";
import type {BaseDB} from "./index.js";

export interface LessonDB extends BaseDB {
    title: string;
    time: string;
    video: string;
    price: number;
    course: Types.ObjectId;
}