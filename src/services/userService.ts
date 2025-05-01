import { APIClient } from "./APIClient.js"
import { decryptAESGCM } from "../utils/encryptionHelper.js"

/**
 * Fetch users encrypted data from API
 * Decode encrypted data
 * @async
 * @returns {Promise<any>} 
 */
export const fetchUsersFromAPI = async (): Promise<any> => {
    const { data } = await APIClient.get<UsersAPIResponse>('/api/users')
    const { d, n, t } = data
    return await decryptAESGCM(d, n, t)
}

/**
 * Description placeholder
 *
 * @async
 * @returns {Promise<any>} 
 */
export const syncUsers = async (): Promise<any> => {
    const { data } = await APIClient.get<UsersAPIResponse>('/api/sync-users')
    const { d, n, t } = data
    return await decryptAESGCM(d, n, t)
}
