import type {CommentDB} from "@src/types/index.js";
import mongoose, {type Model, Types, type Schema} from "mongoose";

const CommentModelShema: Schema<CommentDB> = new mongoose.Schema({
    body: {
        type: String,
        required: true,
        minLength: 3,
    },
    writer: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    isConfirm: {
        type: Boolean,
        default: false,
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
        default: false,
    },
    mainComment: {
        type: Types.ObjectId,
        default: null,
    },
});

CommentModelShema.index({course: 1});

const CommentModel: Model<CommentDB> = mongoose.models.Comment || mongoose.model<CommentDB>("Comment", CommentModelShema, "comments");

export default CommentModel;