import {type CourseDB, CourseStatus} from "@src/types/index.js";
import mongoose, {Types, type Model, type Schema} from "mongoose";

const CourseModelShema: Schema<CourseDB> = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 2,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        support: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: true,
            match: /^\s*[a-zA-Z0-9_-]+\s*$/,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        teacher: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: Types.ObjectId,
            ref: "Category",
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(CourseStatus),
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

CourseModelShema.index({title: 1}, {unique: true});
CourseModelShema.index({href: 1}, {unique: true});

const CourseModel: Model<CourseDB> = mongoose.models.Course || mongoose.model<CourseDB>("Course", CourseModelShema, "courses");

export default CourseModel;