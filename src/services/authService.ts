import { isPasswordMatched } from "@/utils/encryptionHelper"
import { loginPayload } from "@/utils/payloadHelper"
import { APIClient } from "./APIClient"
import { getUserFromDb } from "./IDBService"

const onlineLogin = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
    const LoginCredentials = loginPayload(username, password)
    const response = await APIClient.post<LoginResponse>('/api/login', LoginCredentials)
    if (response?.success) localStorage.setItem('username', response?.data.name);
    return response
}
const offlineLogin = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
    const cachedUser = await getUserFromDb(username);
    if (!cachedUser) return {
        "success": false,
        "message": "User Not Found"
    }

    const isSamePassword = await isPasswordMatched(password, cachedUser.password)
    if (!isSamePassword) return {
        "success": false,
        "message": "Invalid Credentials"
    }
    localStorage.setItem('username', cachedUser.name);
    return {
        "success": true,
        "data": {
            ...cachedUser
        },
        "message": "Login successful"
    }


}
export const submitUserLogin = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
    if (navigator.onLine) return await onlineLogin({ username, password })
    return await offlineLogin({ username, password })
}