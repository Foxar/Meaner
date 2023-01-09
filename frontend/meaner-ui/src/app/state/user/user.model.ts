export interface User {
    name: string;
    id: string;
}

export interface LoginResponse {
    name: string;
    token: string;
    id: string;
    expires: string;
}

export interface LoginRequest {
    name: string;
    password: string;
}