import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUsers } from "../../services/auth/authService";


interface AuthState {
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    error: string | null;
}

const initialState: AuthState = {
    isLoading: false,
    data: null,
    error: null,
};

// Async thunk for signup
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (userData: { email: string; userName: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await signUpUser(userData);
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUsers(userData);
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;  // <-- makes your navigate() run 🎉
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

    },
})


export default authSlice.reducer