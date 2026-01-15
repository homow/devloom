import {Types} from "mongoose";
import type {BaseDB, SafeBaseDB, SafeUserDB, SafeCategoryDB, UserDB, CategoryDB} from "./index.js";

export enum CourseStatus {
    COMPLETED = "COMPLETED",
    PRE_SALSE = "PRE_SALSE",
    IN_PROGRESS = "IN_PROGRESS",
}

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
    status: CourseStatus;
}

export type CoursePopulate = Omit<CourseDB, "category" | "teacher"> & {
    teacher: UserDB;
    category: CategoryDB;
};

export type SafeCourseDB = Omit<CourseDB, "__v" | "_id" | "updatedAt" | "createdAt" | "category" | "teacher"> & SafeBaseDB & {
    teacher: SafeUserDB;
    category: SafeCategoryDB;
};