export const loginPayload = (username: string, password: string): URLSearchParams => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    return urlencoded
}