export interface IgnoredRoutesKeys {
    path: string;
    method: string;
}

export interface CheckIgnoredRoutesParams extends IgnoredRoutesKeys {
    ignoreRoutes: IgnoredRoutesKeys[];
}

export function checkIgnoredRoute(
    {
        ignoreRoutes,
        method,
        path,
    }: CheckIgnoredRoutesParams,
): boolean {
    return ignoreRoutes.some(r => path.includes(r.path) && method === r.method);
}