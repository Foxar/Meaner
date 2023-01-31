import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, find, map, Observable, of, tap, throwError } from "rxjs";
import { STORAGE_JWT } from "../constants/constants";
import { PostTweet } from "../modules/shared/models/tweetModels";
import { HomeTweet } from "../state/home/home-tweet.model";
import { Profile, ProfileResponse } from "../state/profile/profile.model";
import { LoginResponse } from "../state/user/user.model";
import { LoginBody } from "./apiModels";
import { tweetStringDateMapper } from "./tweetStringDateMapper";

@Injectable({providedIn: 'root'})
export class MeanerApiService {

    private apiUrl: string = "http://127.0.0.1:3000/api/";

    apiDelay: number = 500;

    constructor(private http: HttpClient) {}

    getHomeTweets(offset:number = 0): Observable<HomeTweet[]>{
        return this.http.get<HomeTweet[]>(`${this.apiUrl}tweets/home/${offset}`).
            pipe(
                map(tweets => {
                    console.log(tweets);
                    return tweets.map(tweetStringDateMapper);
                }),
                tap(console.log)
            )
    };

    postTweet(tweet: PostTweet): Observable<HomeTweet> {
        console.log(tweet);
        return this.http.post<HomeTweet>(`${this.apiUrl}tweets/`,tweet).pipe(
            delay(this.apiDelay),
            map(tweet => {
                return tweetStringDateMapper(tweet);
            })
        )
    }

    getTweet(id: string): Observable<HomeTweet>{
        return this.http.get<HomeTweet>(`${this.apiUrl}tweets/${id}`).pipe(
            tap((a)=>{console.log("getTweet()");console.log(a)})
        )
    }

    getReplies(id: string): Observable<HomeTweet[]>{ 
        return this.http.get<HomeTweet[]>(`${this.apiUrl}tweets/replies/${id}`).pipe(
            tap((a)=>{console.log("getReplies()");console.log(a)})
        )
    }

    getUserTweets(userId: string): Observable<HomeTweet[]>{
        return this.http.get<HomeTweet[]>(`${this.apiUrl}tweets/user/${userId}`).pipe(
            tap((a)=>{console.log("getUserTweets()");console.log(a)})
        )
    }

    postLogin(name: string, password: string): Observable<LoginResponse> {
        let body: LoginBody = {login: name, password};
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body).pipe(
            tap((a)=>{console.log("postLogin()");console.log(a)})
        )        
    }

    validateJwt(jwtToCheck: string): Observable<LoginResponse> {
        console.log("Meaner api - validate jwt");
        return this.http.get<LoginResponse>(`${this.apiUrl}/auth/validateToken`,{headers: new HttpHeaders({Authorization: jwtToCheck})}).pipe(
            tap((a)=>{console.log("validateJwt()");console.log(a);})
        );
    }


    //In a 'real' service using http, this would look different with httpinterceptors etc.
    getProfile(profileId: string): Observable<ProfileResponse> {
        return this.http.get<ProfileResponse>(`${this.apiUrl}profile/${profileId}`).pipe(
            tap((a)=>{console.log("getProfile()");console.log(a)})
        );
    }

    getProfileByUserId(userId: string): Observable<ProfileResponse> {
        return this.http.get<ProfileResponse>(`${this.apiUrl}profile/user/${userId}`).pipe(
            tap((a)=>{console.log("getProfileByUserId()");console.log(a)})
        );
    }

    postPasswordChange(userId: string, password: string, oldPassword: string): Observable<{}> {
        let body = {userId, password: oldPassword, newPassword: password};
        return this.http.post(`${this.apiUrl}auth/changePassword`, body).pipe(
            tap((a)=>{console.log("postPasswordChange()");console.log(a)})
        );
    }

    likeTweet(tweetId: string): Observable<{}> {
        console.log("ee");
        return this.http.put(`${this.apiUrl}tweets/like/${tweetId}`,{}).pipe(
            tap((a)=>{console.log("likeTweet()");})
        );
    }

}