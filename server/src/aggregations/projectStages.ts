import {baseStage} from "./common.js";
import type {PipelineStage} from "mongoose";

type SafePipelineStage = Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[];

export const categoryProjectStage: SafePipelineStage = [{
    $project: {
        ...baseStage,
        title: 1,
        href: 1,
    }
}];

export const userProjectStage: SafePipelineStage = [{
    $project: {
        ...baseStage,
        name: 1,
        email: 1,
        role: 1,
    }
}];

export const categoryProjectStage: SafePipelineStage = [{
    $project: {

    }
}];

export const courseProjectStage: PipelineStage[] = [
    {
        $lookup: {
            from: "users",
            let: {teacher: "$teacher"},
            pipeline: [
                {$match: {$expr: {$eq: ["$_id", "$$teacher"]}}},
                ...userProjectStage
            ],
            as: "teacher"
        }
    },
    {
        $lookup: {
            from: "category",
            let: {category: "$category"},
            pipeline: [
                {$match: {$expr: {$eq: ["$_id", "$$category"]}}},
            ],
            as: "category"
        }
    },
    {$unwind: "$teacher"},
    {$unwind: "$category"},
    {
        $project: {
            _id: 0
        }
    }
];