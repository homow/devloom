import {baseStage} from "./index.js";
import {type PipelineStage} from "mongoose";

export const userProjectStage: PipelineStage = {
    $project: {
        ...baseStage,
        name: 1,
        email: 1,
        role: 1,
    }
};