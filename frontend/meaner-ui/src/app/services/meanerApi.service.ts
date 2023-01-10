import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, find, map, Observable, of, tap, throwError } from "rxjs";
import { STORAGE_JWT } from "../constants/constants";
import { PostTweet } from "../modules/shared/models/tweetModels";
import { HomeTweet } from "../state/home/home-tweet.model";
import { Profile, ProfileResponse } from "../state/profile/profile.model";
import { LoginResponse } from "../state/user/user.model";
import { LoginBody } from "./apiModels";
import { generateDatabase, MockTweet } from "./mockDataBase";

@Injectable({providedIn: 'root'})
export class MeanerApiService {

    private mockDatabase;
    public static tweetIdNumerator: number = 0;
    private apiUrl: string = "http://127.0.0.1:3000/api/";

    apiDelay: number = 5000;

    constructor(private http: HttpClient) {
        this.mockDatabase = generateDatabase();

    }

    getHomeTweets(offset:number = 0): Observable<HomeTweet[]>{
        console.log("offset");
        console.log(offset)

        // this.http.get('http://127.0.0.1:3000/api/tweets/').subscribe(t=>console.log(t));
        return this.http.get<HomeTweet[]>(`${this.apiUrl}tweets/home/${offset}`).
            pipe(
                map(tweets => {
                    return tweets.map(t=>{
                        return {
                            ...t,
                            date: new Date(t.date),
                        }
                    });
                }),
                // map(tweets => {
                //     return tweets
                //         .filter(t=>!t.replyToId)
                //         //.sort((a,b) => {return b.date.getTime() - a.date.getTime()})
                // }),
            )
        
        // return of(
        //             this.mockDatabase.tweets
        //             .filter(t=>!t.replyToId)
        //             .sort((a,b) => {return b.date.getTime() - a.date.getTime()})
        //             .slice(offset,offset+10)
        //             .map(this.mapMockTweetToHomeTweet.bind(this))
                    
        //         )
        //         .pipe(
        //             tap(() => {console.log("AHAHAAHAH")}),
        //             tap(console.log),
        //             delay(this.apiDelay),
        //             //tap(() => {throw new Error()})
        //             );
    };

    postTweet(tweet: PostTweet): Observable<HomeTweet> {
        const jwt = localStorage.getItem(STORAGE_JWT) || '';

        console.log(tweet);
        return this.http.post<HomeTweet>(`${this.apiUrl}tweets/`,tweet,{headers: new HttpHeaders({Authorization: jwt})}).pipe(
            delay(this.apiDelay),
            tap(() => {
                if(!this.validatePostedTweet(tweet))
                    throw new Error();
            })
        )
        return of(this.mapMockTweetToHomeTweet(this.mockInsertDatabaseTweet(tweet)))
                .pipe(
                    delay(this.apiDelay),
                    tap(() => {
                        if(!this.validatePostedTweet(tweet) ) 
                            throw new Error();
                    })
                );
    }

    getTweet(id: string): Observable<HomeTweet>{

        return this.http.get<HomeTweet>(`${this.apiUrl}tweets/${id}`).pipe(
            tap((a)=>{console.log("gettweet");console.log(a)})
        )
        
        // return of(this.mockDatabase.tweets.find(t=>t.id==id)!) //! Is necessary to prevent MockTweet | undefined not assignable to MockTweet error
        // .pipe(
        //     delay(this.apiDelay),
        //     tap(findRes => { 
        //         if(!findRes)
        //             throw new Error();
        //     }),
        //     map(this.mapMockTweetToHomeTweet.bind(this))
        // );
    }

    getReplies(id: string): Observable<HomeTweet[]>{

        console.log(id);

        return this.http.get<HomeTweet[]>(`${this.apiUrl}tweets/replies/${id}`).pipe(
            tap((a)=>{console.log("getreplies");console.log(a)})
        )


        // return of(
        //     this.mockDatabase.tweets.filter(t=>t.replyToId == id)
        //     .map(this.mapMockTweetToHomeTweet.bind(this))
        // )
        // .pipe(
        //     delay(this.apiDelay),
        //     //tap(()=>{throw new Error()})
        //     );
    }

    getUserTweets(userId: string): Observable<HomeTweet[]>{
        return this.http.get<HomeTweet[]>(`${this.apiUrl}tweets/user/${userId}`).pipe(
            tap((a)=>{console.log("usertweets");console.log(a)})
        )
        
    }

    postLogin(name: string, password: string): Observable<LoginResponse> {

        let body: LoginBody = {login: name, password};
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body).pipe(
            tap((a)=>{console.log("postlogin meanerapi");console.log(a)}),
            tap(console.log)
        )

        // console.log("Meaner api - Post login ");
        // const userFind = this.mockDatabase.users.find(u=>u.name == name);
        // if(!userFind){
        //     console.log("user find none");
        //     return throwError("No user found");
        // }else if(userFind.password != password){
        //     console.log(userFind.password);
        //     console.log(password);
        //     console.log("password invalid");
        //     return throwError("Invalid password");
        // }
            
        // return of(
        //     {
        //         user: userFind,
        //         jwt: 'testjwt.'+userFind.id
        //     }
        // )
        // .pipe(
        //     delay(this.apiDelay)
        // );
        
    }

    validateJwt(jwtToCheck: string): Observable<LoginResponse> {
        console.log("Meaner api - validate jwt");
        return this.http.get<LoginResponse>(`${this.apiUrl}/auth/validateToken`,{headers: new HttpHeaders({Authorization: jwtToCheck})}).pipe(
            tap((a)=>{console.log("validating");console.log(a);})
        );
        // else if(Math.random()>0.5 && false){
        //     return throwError("JWT Token expired.");
        // }else {
        //     return of({
        //         user: user,
        //         jwt: jwtToCheck
        //     })
        // }

    }


    //In a 'real' service using http, this would look different with httpinterceptors etc.
    getProfile(profileId: string, currentUserId: string | null): Observable<ProfileResponse> {

        return this.http.get<ProfileResponse>(`${this.apiUrl}profile/${profileId}`).pipe(
            tap((a)=>{console.log("getProfile()");console.log(a)})
        );

    }

    getProfileByUserId(userId: string, currentUserId: string | null): Observable<ProfileResponse> {
        return this.http.get<ProfileResponse>(`${this.apiUrl}profile/user/${userId}`).pipe(
            tap((a)=>{console.log("getProfileByUserId()");console.log(a)})
        );
    }

    private mapMockTweetToHomeTweet(mockTweet: MockTweet): HomeTweet {
        return {
            ...mockTweet,
            authorName: this.mockDatabase.users.find(u => u.id == mockTweet.authorId)?.name || '',
            }
    }

    private validatePostedTweet(tweet: PostTweet): boolean {
        return (['content','authorId'].every((k) => tweet[k as keyof PostTweet] != undefined) &&
                ![null,'',' '].includes(tweet.content) &&
                tweet.replyToId?this.mockDatabase.tweets.find(t=>t.id == tweet.replyToId) != undefined:true);
    }


    private mockInsertDatabaseTweet(tweet: PostTweet): MockTweet {
        
        
        this.mockDatabase.tweets.push({
            ...tweet,
            id: (MeanerApiService.tweetIdNumerator++).toString(),
            date: new Date(),
            replies: 0,
            likes: 0,
            shares: 0,
        })
        if(tweet.replyToId != null){
            let parentTweet = this.mockDatabase.tweets.find(t=> t.id == tweet.replyToId);
            if(parentTweet!=null)
                parentTweet.replies++;
        }
            
        return this.mockDatabase.tweets.slice(-1)[0];
    }
}