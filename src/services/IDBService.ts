import Dexie from 'dexie';


const db = new Dexie('cached-users');
db.version(1).stores({
    users: 'id, name,firstName, lastName, email,username, password'
});

const usersTable = db.table<DBUser, number>('users');
export const updateDbUsers = async (adaptedUsers: DBUser[]) => {
    await usersTable.bulkPut(adaptedUsers);
}

export const getUserFromDb = async (username: string): Promise<DBUser> => {
    const user = await usersTable
        .where('username')
        .equals(username)
        .first();
    return user
}
export const getRecordsCount = async (): Promise<number> => {
    return await usersTable.count();
}