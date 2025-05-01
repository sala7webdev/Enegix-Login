
export const userAdaptor = (user: User): AdaptedUser => {
    const [firstName, lastName] = user.name.split(" ");
    return {
        ...user,
        firstName,
        lastName
    };
};