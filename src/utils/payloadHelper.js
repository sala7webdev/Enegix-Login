export const loginPayload = (username, password) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    return urlencoded
}