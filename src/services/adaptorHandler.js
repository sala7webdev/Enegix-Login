export const userAdaptor = (user) => {
    const [firstName, lastName] = user.name.split(" ")
    return {
        ...user,
        firstName,
        lastName
    }
}