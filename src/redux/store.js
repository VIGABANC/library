import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import userReducer from './slices/userSlice'; 
import favbrowReducer from './slices/favbrowSlice'; // Import favbrowSlice reducer

const store = configureStore({
  reducer: {
    books: booksReducer,
    user: userReducer,
    favbrow: favbrowReducer,
    

  },
});

export default store; 
