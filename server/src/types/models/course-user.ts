import {Types} from "mongoose";
import type {BaseDB} from "./index.js";

export interface CourseUserDB extends BaseDB {
    course: Types.ObjectId;
    user: Types.ObjectId;
    price: number;
}