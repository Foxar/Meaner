import { homeReducer } from "./home/home.reducer";
import { HomeState } from "./home/home.state";
import { profileReducer } from "./profile/profile.reducer";
import { ProfileState } from "./profile/profile.state";
import { tweetReducer } from "./tweet/tweet.reducer";
import { TweetState } from "./tweet/tweet.state";
import { userReducer } from "./user/user.reducer";
import { UserState } from "./user/user.state";

export interface AppState {
    homeState: HomeState;
    tweetState: TweetState;
    userState: UserState;
    profileState: ProfileState;
}

export const appReducer = {
    home: homeReducer,
    tweet: tweetReducer,
    user: userReducer,
    profile: profileReducer
}