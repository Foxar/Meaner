import { createAction, props } from "@ngrx/store";
import { LoginRequest, LoginResponse, SignupRequest } from "./user.model";


//Login actions
export const login = createAction(
    '[User] Login',
    props<{credentials: LoginRequest}>()
);

export const loginSuccess = createAction(
    '[User] Login success',
    props<{loginResponse: LoginResponse}>()
);

export const loginFailed = createAction(
    '[User] Login failed',
    props<{error: string}>()
);

//JWT Actions

export const validateJwt = createAction(
    '[User] Validate JWT',
    props<{jwt: string}>()
);

export const validateJwtSuccess = createAction(
    '[User] Validate JWT success',
    props<{loginResponse: LoginResponse}>()
);

//Possibly unneeded, remove in future.
export const validateJwtFailed = createAction(
    '[User] Validate JWT failed',
    props<{error: string}>()
);

//Signup actions
export const signup = createAction(
    '[User] Signup',
    props<{credentials: SignupRequest}>()
)

export const signupSuccess = createAction('[User] Signup success')

export const signupFailed = createAction(
    '[User] Signup failed',
    props<{error: string}>()
)

export const resetUser = createAction('[User] Reset')

