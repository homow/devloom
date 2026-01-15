import {Types} from "mongoose";
import type {BaseDB, SafeBaseDB} from "./index.js";

export interface CourseDB extends BaseDB {
    title: string;
    description: string;
    price: number;
    cover: string;
    support: string;
    href: string;
    discount: number;
    teacher: Types.ObjectId;
    category: Types.ObjectId;
    status: "completed" | "forward sale" | "in progress";
}

export type SafeCourseDB = Omit<CourseDB, "__v" | "_id" | "updatedAt" | "createdAt"> & SafeBaseDB;