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
                ...categoryProjectStage
            ],
            as: "category"
        }
    },
    {$unwind: "$teacher"},
    {$unwind: "$category"},
    {
        $project: {
            ...baseStage,
            description: 1,
            price: 1,
            discount: 1,
            cover: 1,
            support: 1,
            href: 1,
            teacher: 1,
            category: 1,
            status: 1,
        }
    }
];