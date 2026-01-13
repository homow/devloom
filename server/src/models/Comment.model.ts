import type {CommentDB} from "@src/types/index.js";
import mongoose, {type Model, Types, type Schema} from "mongoose";

const CommentModelShema: Schema<CommentDB> = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        minLength: 2,
    },
    writer: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    isConfirm: {
        type: Boolean,
        default: false,
        required: true,
    },
    score: {
        type: Number,
        default: 5,
    },
    course: {
        type: Types.ObjectId,
        required: true,
        ref: "Course",
    },
    isReply: {
        type: Boolean,
        required: true,
    },
    mainComment: {
        type: Types.ObjectId,
        required: false,
        default: null,
    },
});