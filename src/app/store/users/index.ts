import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { authFeatureName, authReducer } from "../auth/auth.reducer";
import { localStorageSync } from "ngrx-store-localstorage";

interface RootState {}

export const rootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: authReducer,
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: ['todos']})(reducer);
    // {keys: ['todos'], rehydrate: true}
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];