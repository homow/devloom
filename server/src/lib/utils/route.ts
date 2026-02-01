import {BASE_URL} from "@src/path.js";

/** get a regex for ignore route */
export function getRegexForIgnoreRoutes(regex: string): RegExp {
    const getRegexString = `^${BASE_URL}${regex}`;
    return new RegExp(getRegexString);
}

export interface IgnoredRoutesKeys {
    path: string | RegExp;
    method: string;
}

export interface CheckIgnoredRoutesParams {
    ignoreRoutes: IgnoredRoutesKeys[];
    path: string;
    method: string;
}

/** check ignore route from regex or string(matchable last of path) */
export function checkIgnoredRoute(
    {
        ignoreRoutes,
        method,
        path,
    }: CheckIgnoredRoutesParams,
): boolean {
    return ignoreRoutes.some(r => {
        if (typeof r.path === "string") {
            const normalize = (p: string) => p.replace(/\/$/, "");
            const match: string = normalize(path).slice(-normalize(r.path).length);
            return r.path === match && method === r.method;
        }
        return r.path.test(path) && r.method === method;
    });
}