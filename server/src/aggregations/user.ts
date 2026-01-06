import mongoose, {type PipelineStage} from "mongoose";

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

interface UserFilter {
    id?: string;
    email?: string;
}

export function userAggregate(
    filter?: UserFilter,
    useAnd: boolean = false
) {
    const stages: PipelineStage[] = [userProjectStage];

    if (filter) {
        const conditions: Record<string, unknown>[] = [];

        if (filter.id) conditions.push({_id: new mongoose.Types.ObjectId(filter.id)});
        if (filter.email) conditions.push({email: filter.email});

        if (conditions.length > 0) {
            const matchStage = useAnd
                ? {$and: conditions}
                : {$or: conditions};

            stages.unshift({$match: matchStage} as PipelineStage);
        }
    }
    return stages;
}