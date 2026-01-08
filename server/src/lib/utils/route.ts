export const ignoreRoutes: string[] = ["/login", "/signup", "/refresh"];

export function checkIgnoredRoute(path: string): boolean {
    return ignoreRoutes.some(r => path.toLowerCase().startsWith(r.toLowerCase()));
}