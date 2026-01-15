import type {ObjectId} from "mongoose";
import type {BaseDB, SafeBaseDB, SafeUserDB, SafeCategoryDB, UserDB, CategoryDB} from "./index.js";

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

export type CoursePopulate = Omit<CourseDB, "category" | "teacher"> & {
    teacher: UserDB;
    category: CategoryDB;
};

export type SafeCourseDB = Omit<CourseDB, "__v" | "_id" | "updatedAt" | "createdAt" | "category" | "teacher"> & SafeBaseDB & {
    teacher: SafeUserDB;
    category: SafeCategoryDB;
};