import {Types} from "mongoose";
import type {BaseDB, SafeBaseDB} from "./index.js";

export type BaseComment = {
    body: string;
    score: number;
    isConfirm: boolean;
    writer: Types.ObjectId;
    course: Types.ObjectId;
    isReply: boolean;
    parentComment: null | Types.ObjectId;
};

export type CommentDB = BaseDB & BaseComment;

export type SafeCommentDB = SafeBaseDB & Omit<BaseComment, "parentComment" | "writer" | "course"> & {
    writer: string;
    course: string;
    parentComment: string | null;
};