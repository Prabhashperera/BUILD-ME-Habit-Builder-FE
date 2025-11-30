import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import sleepLogReducer from "./slices/sleepLogSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sleepHabit: sleepLogReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;