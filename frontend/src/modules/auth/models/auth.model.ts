export interface LoginResult {
    errorCode: number;
    message: string;
    user: {
        fullname: string;
        username: string;
        email: string;
    }
}
