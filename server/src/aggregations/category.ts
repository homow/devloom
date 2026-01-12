import {baseStage} from "./index.js";
import type {PipelineStage} from "mongoose";

export const categoryProjectStage: PipelineStage = {
    $project: {
        ...baseStage,
        title: 1,
        href:1,
    }
};