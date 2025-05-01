import { BASE_API } from "../utils/appConfigurations"

/**
 * Centeralized API Client to handle all App API requests
 *
 * @type {{ get: <T>(endpoint: string) => Promise<T>; post: <T>(endpoint: string, body: Record<string, any>) => Promise<T>; }}
 */
export const APIClient = {
    get: async <T>(endpoint: string): Promise<T | undefined> => {
        if (!navigator.onLine) return

        const response = await fetch(`${BASE_API}${endpoint}`)
        return response.json() as T
    },
    post: async <T>(endpoint: string, body: Record<string, any>): Promise<T | undefined> => {
        if (!navigator.onLine) return

        const response = await fetch(`${BASE_API}${endpoint}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: normalizeBody(body)
        })
        return response.json() as T
    }
}


/**
 * Unify requests body to be URLSearchParams
 *
 * @param {(Record<string, unknown> | URLSearchParams | string)} body 
 * @returns {URLSearchParams} 
 */
const normalizeBody = (body: Record<string, unknown> | URLSearchParams | string): URLSearchParams => {
    if (body instanceof URLSearchParams) return body;
    if (typeof body === 'string') return new URLSearchParams(body);

    const params = new URLSearchParams();
    Object.entries(body)
        .forEach(([key, value]) => {
            if (value !== undefined) params.append(key, String(value));
        });
    return params;
};