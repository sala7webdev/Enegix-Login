interface User {
    name: string;
    [key: string]: any;
}

interface AdaptedUser extends User {
    firstName: string;
    lastName: string;
}
