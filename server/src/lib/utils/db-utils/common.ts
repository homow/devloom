import mongoose from "mongoose";

export function createQueryPattern(
    params: Record<string, unknown>[],
    useAnd?: boolean
) {
    const filtered: Record<string, unknown>[] = params.filter(v => Object.values(v)[0] !== undefined).map(v => {
        if (Object.keys(v)[0] === "_id") {
            return {
                _id: new mongoose.Types.ObjectId(Object.values(v)[0] as string)
            };
        }

        return v;
    });

    if (filtered.length === 0) throw new Error("At least one condition must be provided");
    if (filtered.length === 1) return filtered[0];

    return useAnd
        ? {$and: filtered}
        : {$or: filtered};
}