import type {CommentDB} from "@src/types/index.js";
import mongoose, {type Model, Types, type Schema} from "mongoose";

const CommentModelShema: Schema<CommentDB> = new mongoose.Schema(
    {
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
            ref: "Comment",
        },
    },
    {
        timestamps: true,
    }
);

CommentModelShema.index({course: 1, isReply: 1});
CommentModelShema.index({mainComment: 1, createdAt: -1});

const CommentModel: Model<CommentDB> = mongoose.models.Comment || mongoose.model<CommentDB>("Comment", CommentModelShema, "comments");

export default CommentModel;