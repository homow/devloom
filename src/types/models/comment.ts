import {Types} from "mongoose";
import type {BaseDB, SafeBaseDB, SafeCourseDB, SafeUserDB} from "./index.js";

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

type BaseSafeCommentDB = Omit<BaseComment, "parentComment" | "writer" | "course">;


export type SafeCommentDB = SafeBaseDB & BaseSafeCommentDB & {
    writer: SafeUserDB;
    course: SafeCourseDB;
    parentComment: SafeCommentDB | null;
};