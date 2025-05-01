import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from "./appConfigurations"

/**
 * Perform username validation rules
 *
 * @param {string} username 
 * @returns {boolean} 
 */
const isValidUsername = (username: string): boolean =>
    username.length >= MIN_USERNAME_LENGTH;


/**
 * Perform password validation rules
 *
 * @param {string} password 
 * @returns {boolean} 
 */
const isValidPassword = (password: string): boolean =>
    password.length >= MIN_PASSWORD_LENGTH;

export { isValidUsername, isValidPassword }