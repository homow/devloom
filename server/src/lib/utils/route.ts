export interface IgnoredRoutes {
    path: string;
    method: string;
}

interface Params {
    path: string;
    method: string;
}

const ignoreRoutes: Readonly<IgnoredRoutes[]> = [
    {method: "POST", path: "refresh"},
    {method: "POST", path: "login"},
    {method: "POST", path: "logout"},
    {method: "POST", path: "signup"},
] as const;

export function checkIgnoredRoute(
    {
        method,
        path,
    }: Params,
) {
    return ignoreRoutes.some(r => path.includes(r.path) && method === r.method);
}