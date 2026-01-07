export function createQueryPattern(
    params: Record<string, unknown>[],
    useAnd?: boolean
) {
    const filtered = params.filter(
        v => {
            const val = Object.values(v)[0];
            return val !== null && val !== undefined;
        }
    );

    if (filtered.length === 0) {
        throw new Error("At least one condition must be provided");
    }

    if (filtered.length === 1) {
        return filtered[0];
    }

    return useAnd
        ? {$and: filtered}
        : {$or: filtered};
}