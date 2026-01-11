import type {CategoryDB} from "@src/types/index.js";
import mongoose, {type Model, type Schema} from "mongoose";

const CategoryModelShema: Schema<CategoryDB> = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    href: {
        type: String,
        required: true,
    }
});

const CategoryModel: Model<CategoryDB> = mongoose.models.Category || mongoose.model<CategoryDB>("Category", CategoryModelShema, "category");

export default CategoryModel;