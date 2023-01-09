import { User } from "./user.model";

export enum UserStateStatus {
    LOGGING_IN = 'LOGGING_IN',
    LOGGED_IN = 'LOGGED_IN',
    INIT = 'INIT',
    ERROR = 'ERROR'
}


export interface UserState {
    user: User | null;
    error: string | null;
    status: UserStateStatus;
}