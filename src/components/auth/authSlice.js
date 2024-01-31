import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser } from './authApi';

export const signUpAsync = createAsyncThunk(
    'auth/signUpAsync',
    async (userData) => {
        const response = await createUser(userData);
        return response.data
    }
);


export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo, { rejectWithValue }) => {
        try {
            const response = await checkUser(loginInfo);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);




export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedInUser: null,
        status: 'idle'
    },
    reducers: {
        signOut: (state) => {
            state.loggedInUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            })
            .addCase(signUpAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUpAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
            });
    },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const { signOut } = authSlice.actions;
export default authSlice.reducer;
