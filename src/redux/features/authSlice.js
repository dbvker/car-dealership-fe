import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userID: null,
    },
    reducers: {
        addAuth: (state, action) => {
            state.userID = action.payload;
        },
        removeAuth: (state, action) => {
            state.userID = null;
        },
    },
});

export const { addAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
