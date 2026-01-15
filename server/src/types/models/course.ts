import type {ObjectId} from "mongoose";
import type {BaseDB, SafeBaseDB} from "./index.js";

export interface CourseDB extends BaseDB {
    title: string;
    description: string;
    price: number;
    cover: string;
    support: string;
    href: string;
    discount: number;
    teacher: ObjectId;
    category: ObjectId;
    status: "completed" | "forward sale" | "in progress";
}

export type SafeCourseDB = Omit<CourseDB, "__v" | "_id" | "updatedAt" | "createdAt" | "category" | "teacher"> & SafeBaseDB & {
    teacher: string;
    category: string;
};