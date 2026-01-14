import {baseStage} from "./common.js";
import type {PipelineStage} from "mongoose";

export const categoryProjectStage: PipelineStage[] = [{
    $project: {
        ...baseStage,
        title: 1,
        href: 1,
    }
}];

export const userProjectStage: PipelineStage[] = [{
    $project: {
        ...baseStage,
        name: 1,
        email: 1,
        role: 1,
    }
}];

export const courseProjectStage: PipelineStage[] = [
    {
        $lookup: {
            from: "users",
            let: {teacher: "$teacher"},
            pipeline: [
                {$match: {$expr: {$eq: ["$_id", "$$teacher"]}}},

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
    {
        $project: {
            _id: 0
        }
    }
];