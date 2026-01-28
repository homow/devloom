import {Types} from "mongoose";
import type {BaseDB} from "./index.js";

export interface CommentDB extends BaseDB {
    body: string;
    score: number;
    isConfirm: boolean;
    writer: Types.ObjectId;
    course: Types.ObjectId;
    isReply: boolean;
    parentComment: null | Types.ObjectId;
}