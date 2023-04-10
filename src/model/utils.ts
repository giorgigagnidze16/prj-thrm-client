export interface UserDTO {
    username: string;
    password?: string;
}

export type Token = {
    accessToken: string,
    refreshToken: string
}

function authHeader() {
    const current: Token | null = getCurrentUser();

    if (current && current.accessToken) {
        return {Authorization: "Bearer " + current.accessToken}
    } else {
        return {};
    }
}

function headerWithName() {
    const current: Token | null = getCurrentUser();

    if (current && current.accessToken) {
        return {
            Authorization: "Bearer " + current.accessToken,
            name: "" + getCurrentUsername()
        }
    } else {
        return {};
    }
}

const handleLoginSuccess = (token: Token, username: string) => {
    if (token.accessToken) {
        localStorage.setItem("user", JSON.stringify(token))
        localStorage.setItem("username", username)
    }
    handleLoginRedirect()
}

const handleLoginRedirect = () => {
    window.location.replace(`${process.env.REACT_APP_URL!}/profile`)
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user")!);
}

const getCurrentUsername = () => {
    return localStorage.getItem("username");
}

export {handleLoginSuccess, authHeader, getCurrentUser, handleLoginRedirect, getCurrentUsername, headerWithName};