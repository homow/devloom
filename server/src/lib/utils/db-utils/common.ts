export function createQueryPattern(
    params: Record<string, unknown>[],
    useAnd?: boolean
) {
    const filtered: Record<string, unknown>[] = params.filter(v => Object.values(v)[0] !== undefined);

    if (filtered.length === 0) throw new Error("At least one condition must be provided");
    if (filtered.length === 1) return filtered[0];

    return useAnd
        ? {$and: filtered}
        : {$or: filtered};
}