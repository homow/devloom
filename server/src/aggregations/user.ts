import {type PipelineStage} from "mongoose";
import {createQueryPattern} from "@src/lib/index.js";

export const userProjectStage = {
    $project: {
        _id: 0,
        id: {$toString: "$_id"},
        name: 1,
        email: 1,
        role: 1,
        createdAt: {$toString: "$createdAt"},
        updatedAt: {$toString: "$updatedAt"}
    }
};

export function userAggregate(
    filter?: Record<string, unknown>[],
    useAnd: boolean = false
) {
    const stages: PipelineStage[] = [userProjectStage];

    if (filter && filter.length > 0) {
        const matchStage = createQueryPattern(
            filter,
            useAnd
        );
        stages.unshift({$match: matchStage} as PipelineStage);
    }
    return stages;
}