import mongoose, {Types, type Model} from "mongoose";
import type {CourseUserDB} from "@src/types/index.js";

const CourseUserModelSchema = new mongoose.Schema<CourseUserDB>(
    {
        course: {
            type: Types.ObjectId,
            required: true,
            ref: "Course",
        },
        user: {
            type: Types.ObjectId,
            required: true,
            ref: "User",
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);


const CourseUserModel: Model<CourseUserDB> = mongoose.models.CourseUser || mongoose.model("CourseUser", CourseUserModelSchema, "course_user");

export default CourseUserModel;