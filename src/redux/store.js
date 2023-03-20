import { configureStore } from '@reduxjs/toolkit';

// Slices
import searchReducer from './features/searchSlice';
import authReducer from './features/authSlice';

export default configureStore({
    reducer: {
        searchFilter: searchReducer,
        userAuth: authReducer,
        
    },
});
