import type {LessonDB} from "@src/types/index.js";
import mongoose, {type Model, type Schema} from "mongoose";

const LessonModelShema: Schema<LessonDB> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    free: {
        type: Boolean,
        required: true,
        default: false,
    },
    time: {
        type: String,
        required: true,
        minLength: 1
    },
    video: {
        type: String,
        required: true,
        minLength: 1
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    }
}, {
    timestamps: true
});

LessonModelShema.index({title: 1}, {unique: true});

const LessonModel: Model<LessonDB> = mongoose.models.Lesson || mongoose.model<LessonDB>("Lesson", LessonModelShema, "lessons");

export default LessonModel;