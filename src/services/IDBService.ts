import Dexie from 'dexie';

/**
 * Initialing IndexedDB DB for users caching
 */
const db = new Dexie('cached-users');
db.version(1).stores({
    users: 'id, name,firstName, lastName, email,username, password'
});

const usersTable = db.table<DBUser, number>('users');
/**
 * Inserting or Updating cached users in DB
 *
 * @async
 * @param {DBUser[]} adaptedUsers 
 * @returns {*} 
 */
export const updateDbUsers = async (adaptedUsers: DBUser[]) => {
    await usersTable.bulkPut(adaptedUsers);
}

/**
 * Get cached user data based on username
 *
 * @async
 * @param {string} username 
 * @returns {Promise<DBUser>} 
 */
export const getUserFromDb = async (username: string): Promise<DBUser> => {
    const user = await usersTable
        .where('username')
        .equals(username)
        .first();
    return user
}
/**
 * Get the current cached users count in IndexDB
 *
 * @async
 * @returns {Promise<number>} 
 */
export const getRecordsCount = async (): Promise<number> => {
    return await usersTable.count();
}