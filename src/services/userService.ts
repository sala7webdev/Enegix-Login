import { APIClient } from "./APIClient.js"
import { decryptAESGCM } from "../utils/encryptionHelper.js"

export const fetchUsersFromAPI = async (): Promise<any> => {
    const { data } = await APIClient.get<UsersAPIResponse>('/api/users')
    const { d, n, t } = data
    return await decryptAESGCM(d, n, t)
}

export const syncUsers = async (): Promise<any> => {
    const { data } = await APIClient.get<UsersAPIResponse>('/api/sync-users')
    const { d, n, t } = data
    return await decryptAESGCM(d, n, t)
}
