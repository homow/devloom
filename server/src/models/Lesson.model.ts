import type {LessonDB} from "@src/types/index.js";
import mongoose, {type Model, type Schema} from "mongoose";

const LessonModelShema: Schema<LessonDB> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    time: {
        type: String,
        required: true,
        minlength: 1
    },
    video: {
        type: String,
        required: true,
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