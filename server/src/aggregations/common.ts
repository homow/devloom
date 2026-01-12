import type {PipelineStage} from "mongoose";
import {createQueryPattern} from "@src/lib/index.js";

export const baseStage = {
    _id: 0,
    id: {$toString: "$_id"},
    createdAt: {$toString: "$createdAt"},
    updatedAt: {$toString: "$updatedAt"}
};

interface AggregateStageParams {
    filter?: Record<string, unknown>[];
    useAnd?: boolean;
    stage: PipelineStage;
}

export function createAggregateStage(
    {
        filter,
        stage,
        useAnd = false,
    }: AggregateStageParams
): PipelineStage[] {
    const stages: PipelineStage[] = [stage];

    if (filter && filter.length > 0) {
        const matchStage = createQueryPattern(
            filter,
            useAnd
        );
        stages.unshift({$match: matchStage} as PipelineStage);
    }
    return stages;
}