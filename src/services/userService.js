import { APIClient } from "./APIClient.js"
import { decryptAESGCM } from "../utils/encryptionHelper.js"

export const fetchUsersFromAPI = async () => {
    const { data } = await APIClient.get('/api/users')
    const { d, n, t } = data
    return await decryptAESGCM(d, n, t)
}

export const syncUsers = async () => {
    const { data } = await APIClient.get('/api/sync-users')
    const { d, n, t } = data
    return await decryptAESGCM(d, n, t)
}
