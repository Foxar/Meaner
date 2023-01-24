import { createReducer, on } from "@ngrx/store";
import { changePassword, changePasswordFailure, changePasswordSuccess } from "./settings.action";
import { SettingsCategoryStatus, SettingsState } from "./settings.state";

export const initialState: SettingsState = {
    categories: {
        changePassword: {
            error: null,
            status: SettingsCategoryStatus.INIT
        }
    }
}

export const settingsReducer = createReducer(
    initialState,
    on(changePassword, (state: SettingsState) => ({
        ...state,
        categories: {
            ...state.categories,
            changePassword: {
                ...state.categories.changePassword,
                status: SettingsCategoryStatus.PENDING
            }
        }
    })),
    on(changePasswordSuccess, (state: SettingsState) => ({
        ...state,
        categories: {
            ...state.categories,
            changePassword: {
                ...state.categories.changePassword,
                status: SettingsCategoryStatus.INIT,
            }
        }
    })),
    on(changePasswordFailure, (state: SettingsState, { error }) => ({
        ...state,
        categories: {
            ...state.categories,
            changePassword: {
                ...state.categories.changePassword,
                status: SettingsCategoryStatus.ERROR,
                error: error
            }
        }
    })),
)