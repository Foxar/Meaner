import { createFeatureSelector, createSelector } from "@ngrx/store"
import { SettingsState } from "./settings.state"

export const selectSettingsState = createFeatureSelector<SettingsState>("settings")

export const selectPasswordStatus = createSelector(
    selectSettingsState,
    (state: SettingsState) => {
        return state.categories.changePassword.status;
    }
)

export const selectPasswordError = createSelector(
    selectSettingsState,
    (state: SettingsState) => {
        return state.categories.changePassword.error;
    }
)