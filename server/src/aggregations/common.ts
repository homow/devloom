import type {PipelineStage} from "mongoose";
import {createQueryPattern} from "@src/lib/index.js";

/** type-safe for lookup and join */
export type SafePipelineStage = Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[];

export const baseStage = {
    _id: 0,
    id: {$toString: "$_id"},
    createdAt: {$toString: "$createdAt"},
    updatedAt: {$toString: "$updatedAt"}
};

interface AggregateStageParams {
    filter?: Record<string, unknown>[];
    useAnd?: boolean;
    stage: PipelineStage[];
}

/** create lookup */
export const createLookup = (
    from: string,
    localField: string,
    as: string,
    pipeline: SafePipelineStage
): PipelineStage.Lookup => ({
    $lookup: {
        from,
        let: {[localField]: `$${localField}`},
        pipeline: [
            {$match: {$expr: {$eq: ["$_id", `$$${localField}`]}}},
            ...pipeline
        ],
        as
    }
});

export function createPipelineStage(
    {
        filter,
        stage,
        useAnd = false,
    }: AggregateStageParams
): PipelineStage[] {
    const newStage: PipelineStage[] = [...stage];
    if (filter && filter.length > 0) {
        const matchStage = createQueryPattern(
            filter,
            useAnd
        );
        newStage.unshift({$match: matchStage} as PipelineStage);
    }
    return newStage;
}