import Dexie from 'dexie';

const db = new Dexie('cached-users');
db.version(1).stores({
    users: 'id, name,firstName, lastName, email,username, password'
});

export const updateDbUsers = async (adaptedUsers) => {
    await db.users.bulkPut(adaptedUsers);
}

export const getUserFromDb = async (username) => {
    const user = await db.users
        .where('username')
        .equals(username)
        .first();
    return user
}
export const getRecordsCount = async () => {
    return await db.users.count();
}