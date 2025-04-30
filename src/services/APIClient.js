import { BASE_API } from "../utils/appConfigurations"
export const APIClient = {
    get: async (endpoint) => {
        if (!navigator.onLine) return

        const response = await fetch(`${BASE_API}${endpoint}`)
        return response.json()
    },
    post: async (endpoint, body) => {
        if (!navigator.onLine) return

        const response = await fetch(`${BASE_API}${endpoint}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body
        })
        return response.json()
    }
}