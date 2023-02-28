export enum SettingsCategoryStatus {
    INIT = 'INIT',
    PENDING = 'PENDING',
    ERROR = 'ERROR'
}

export interface SettingsState {
    categories: {
        changePassword: {
            error: string | null;
            status: SettingsCategoryStatus;
        };
        changeDescription: {
            error: string | null;
            status: SettingsCategoryStatus;
        }
    }
}