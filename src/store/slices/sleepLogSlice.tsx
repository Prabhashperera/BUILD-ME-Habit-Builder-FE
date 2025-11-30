/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sleepLogSave } from "../../services/forms/sleepFormService";


interface AuthState {
    isLoading: boolean;
    data: any;
    error: string | null;
}

const initialState: AuthState = {
    isLoading: false,
    data: null,
    error: null,
};

// Thunk Method to send the data to Service
export const saveSleepLog = createAsyncThunk(
    "habit/save",
    async (userData: { sleptAt: string, wokeAt: string }, { rejectWithValue }) => {
        try {
            const response = await sleepLogSave(userData)
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message)
        }
    }
)

const sleepLogSlice = createSlice({
    name: "sleepHabit",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveSleepLog.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(saveSleepLog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(saveSleepLog.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    },
})


export default sleepLogSlice.reducer