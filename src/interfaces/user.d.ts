export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}
export interface ILoginUser {
    email: string;
    password: string;
}
export interface IDecodedUser {
    name: string;
    user_id: string;
}
export interface IUpdateUser {
    name?: string;
    email?: string;
    password?: string;
}


