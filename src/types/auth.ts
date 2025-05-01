interface LoginCredentials {
    username: string;
    password: string;
}

interface UserData {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
}

interface LoginResponse {
    success: boolean;
    data?: UserData;
    message: string;
}
