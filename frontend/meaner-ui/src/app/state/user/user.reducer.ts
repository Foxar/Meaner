import { createReducer, on } from "@ngrx/store";
import { STORAGE_JWT, STORAGE_JWT_EXPIRE } from "src/app/constants/constants";
import { login, loginFailed, loginSuccess, resetUser, validateJwt } from "./user.actions";
import { UserState, UserStateStatus } from "./user.state";

export const initialState: UserState = {
    user: null,
    error: null,
    status: UserStateStatus.INIT
}

export const userReducer = createReducer(
    initialState,
    on(login,validateJwt, (state: UserState, { }) => {
        console.log("Login/ValidateJWT reducer");
        return ({
            ...state,
            status: UserStateStatus.LOGGING_IN
        })
    }),
    on(loginSuccess, (state: UserState, { loginResponse }) => {
        console.log("login success reducer");
        console.log(loginResponse);
        localStorage.setItem(STORAGE_JWT, loginResponse.token);
        localStorage.setItem(STORAGE_JWT_EXPIRE, loginResponse.expires)
        return ({
            ...state,
            user: {...loginResponse},
            status: UserStateStatus.LOGGED_IN
        })
    }),
    on(loginFailed, (state: UserState, { error }) => ({
        ...state,
        error: error,
        status: UserStateStatus.ERROR
    })),
    on(resetUser, () => {
        console.log("resetUser reducer");
        return ({
            ...initialState
        });
    })
    
)