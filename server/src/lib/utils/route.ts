export interface IgnoredRoutes {
    path: string;
    method: string;
}

interface Params {
    path: string;
    method: string;
}

const ignoreRoutes: Readonly<IgnoredRoutes[]> = [
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
    }: Params,
): boolean {
    return ignoreRoutes.some(r => path.includes(r.path) && method === r.method);
}