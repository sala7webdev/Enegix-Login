
/**
 * Adaptot function to add firstName and lastName
 * @param {User} user 
 * @returns {AdaptedUser} 
 */
export const userAdaptor = (user: User): AdaptedUser => {
    const [firstName, lastName] = user.name.split(" ");
    return {
        ...user,
        firstName,
        lastName
    };
};