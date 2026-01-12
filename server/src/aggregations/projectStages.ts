import {baseStage} from "./common.js";
import type {PipelineStage} from "mongoose";

export const categoryProjectStage: PipelineStage = {
    $project: {
        ...baseStage,
        title: 1,
        href:1,
    }
};

export const userProjectStage: PipelineStage = {
    $project: {
        ...baseStage,
        name: 1,
        email: 1,
        role: 1,
    }
};