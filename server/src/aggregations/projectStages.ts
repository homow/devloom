import {baseStage} from "./common.js";
import type {PipelineStage} from "mongoose";

// type-safe for lookup and join
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

export const courseProjectStage: SafePipelineStage = [
    {
        // look and join teacher form users collection
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
        // look and join category form users collection
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
    // flatten arrays
    {$unwind: "$teacher"},
    {$unwind: "$category"},
    {
        $project: {
            ...baseStage,
            title: 1,
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

export const lessonProjectStage: SafePipelineStage = [
    {
        $lookup: {
            from: "courses",
            let: {course: "$course"},
            pipeline: [
                {$match: {$expr: {$eq: ["$_id", "$$course"]}}},
                ...courseProjectStage
            ],
            as: "course"
        }
    },
    {$unwind: "$course"},
    {
        $project: {
            ...baseStage,
            title: 1,
            free: 1,
            time: 1,
            video: 1,
            course: 1
        }
    }
];