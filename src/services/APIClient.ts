import { BASE_API } from "../utils/appConfigurations"
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