import type {BaseDB} from "./common.js";

export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
}

export interface UserDB extends BaseDB {
    name?: string;
    email: string;
    role: UserRole;
    username: string;
    password: string;
}