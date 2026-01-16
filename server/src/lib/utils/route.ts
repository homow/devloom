import {BASE_URL} from "@src/path.js";

export function getRegexForIgnoreRoutes(regex: string): RegExp {
    const getLessonRegexString = `^${BASE_URL}${regex}`;
    return new RegExp(getLessonRegexString);
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

export function checkIgnoredRoute(
    {
        ignoreRoutes,
        method,
        path,
    }: CheckIgnoredRoutesParams,
): boolean {
    return ignoreRoutes.some(r => {
        if (typeof r.path === "string") {
            const match: string = path.slice(path.length - r.path.length);
            return r.path === match && method === r.method;
        }
        return r.path.test(path) && r.method === method;
    });
}