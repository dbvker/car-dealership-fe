import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        term: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.term = action.payload;
        },
    },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
