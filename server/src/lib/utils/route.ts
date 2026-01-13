export interface IgnoredRoutesArray {
    path: string;
    method: string;
}

const ignoreRoutes: Readonly<IgnoredRoutesArray[]> = [
    {method: "POST", path: "/auth/refresh"},
    {method: "POST", path: "/auth/login"},
    {method: "POST", path: "/auth/logout"},
    {method: "POST", path: "/auth/signup"},
    {method: "GET", path: "/category"},
] as const;

export function checkIgnoredRoute(
    {
        method,
        path,
    }: IgnoredRoutesArray,
): boolean {
    return ignoreRoutes.some(r => path.includes(r.path) && method === r.method);
}