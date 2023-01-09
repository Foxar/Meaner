import { User } from "../user/user.model";

export interface Profile { 
    id: string,
    userId: string,
    description: string,
    dateCreated: Date,
    tweetCount: number,
}

export interface ProfileDisplayModel {
    id: string,
    userId: string,
    userName: string,
    description: string,
    dateCreated: Date,
    tweetCount: number,
}

export interface ProfileResponse {
    user: User | null,
    id: string,
    userId: string,
    description: string,
    dateCreated: Date,
    tweetCount: number,
    blocked: boolean | null;
}