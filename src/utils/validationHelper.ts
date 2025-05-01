import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "./appConfigurations"

const isValidUsername = (username: string): boolean =>
    username.length >= MIN_USERNAME_LENGTH;


const isValidPassword = (password: string): boolean =>
    password.length >= MIN_PASSWORD_LENGTH;

export { isValidUsername, isValidPassword }