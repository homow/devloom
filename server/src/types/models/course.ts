import type {BaseDB} from "./index.js";
import {Types} from "mongoose";

export interface Course extends BaseDB {
    title: string;
    description: string;
    price: number;
    cover: string;
    support: string;
    href: string;
    discount: number;
    teacher: Types.ObjectId;
    category: Types.ObjectId;
    status: "completed" | "forward sale" | "is ";
}