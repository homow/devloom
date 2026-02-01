import type {PipelineStage} from "mongoose";
import {baseStage, createLookup, type SafePipelineStage} from "./index.js";

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
    // look and join teacher form users collection
    createLookup("users", "teacher", "teacher", userProjectStage),
    // look and join category form users collection
    createLookup("category", "category", "category", categoryProjectStage),

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
    createLookup("courses", "course", "course", courseProjectStage),
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

const commentProject: PipelineStage.Project = {
    $project: {
        ...baseStage,
        body: 1,
        score: 1,
        isConfirm: 1,
        isReply: 1,
        writer: 1,
        course: 1,
    }
};

export const commentProjectStage: SafePipelineStage = [
    // look and join writer form users collection
    createLookup("users", "writer", "writer", userProjectStage),
    // look and join course form courses collection
    createLookup("courses", "course", "course", courseProjectStage),
    {$unwind: "$course"},
    {$unwind: "$writer"},
    commentProject
];

export const commentWithParentStage: SafePipelineStage = [
    // look and join writer form users collection
    createLookup("users", "writer", "writer", userProjectStage),
    // look and join course form courses collection
    createLookup("courses", "course", "course", courseProjectStage),
    createLookup("comments", "parentComment", "parentComment", commentProjectStage),
    {$unwind: "$course"},
    {$unwind: "$writer"},
    {$unwind: "$parentComment"},
    {
        $project: {
            ...commentProject.$project,
            parentComment: 1,
        }
    }
];