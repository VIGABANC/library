import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  borrowedBooks: [
    { bookid: 1, userid: 1,DateBorrowed:'10-01-2024',DateofReturn:'10-02-2024' },
    { bookid: 2, userid: 2 ,DateBorrowed:'10-01-2024',DateofReturn:'10-02-2024'},
  ],
  favoriteBooks: [
    { bookid: 3, userid: 1 },
    { bookid: 4, userid: 2 },
    { bookid: 3, userid: 2 },
    { bookid: 1, userid: 2 },
  ],
};

const favbrowSlice = createSlice({
  name: 'favbrow',
  initialState,
  reducers: {
    addBorrowedBook: (state, action) => {
      const { bookid, userid, DateBorrowed, DateofReturn } = action.payload;
      state.borrowedBooks.push({
        bookid,
        userid,
        DateBorrowed,  
        DateofReturn   
      });
    },
    

    returnBorrowedBook: (state, action) => {
      const { bookid, userid } = action.payload;
      state.borrowedBooks = state.borrowedBooks.filter(
        (book) => book.bookid !== bookid || book.userid !== userid
      );
    },

    addFavoriteBook: (state, action) => {
      const { bookid, userid } = action.payload;
      state.favoriteBooks.push({ bookid, userid });
    },

    removeFavoriteBook: (state, action) => {
      const { bookid, userid } = action.payload;
      state.favoriteBooks = state.favoriteBooks.filter(
        (book) => book.bookid !== bookid || book.userid !== userid
      );
    },
  },
});

export const {
  addBorrowedBook,
  returnBorrowedBook,
  addFavoriteBook,
  removeFavoriteBook,
} = favbrowSlice.actions;

// Selectors to get borrowed and favorite books
export const selectBorrowedBooks = (state) => state.favbrow.borrowedBooks;
export const selectFavoriteBooks = (state) => state.favbrow.favoriteBooks;

export default favbrowSlice.reducer;
