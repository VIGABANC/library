import { createSlice } from '@reduxjs/toolkit';
import books1 from '../../images/books/book1.png';
import books2 from '../../images/books/book2.png';
import books3 from '../../images/books/book3.png';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [
      {
        id: 1,
        image: books3,
        title: "Company of One",
        author: "Paul Jarvis",
        rating: 2.8,
        pages: 320,
        reviews: 110,
        totalRatings: 643,
        category: "Business",
        isbn: "978-1328972354",
        language: "English",
        quantity: 5,
        date: {
          published: { day: 15, month: 1, year: 2019 },
          addedToLibrary: { day: 10, month: 5, year: 2023 },
        },
        description: "Company of One offers a refreshingly original business strategy...",
      },
      {
        id: 2,
        image: books2,
        title: "Company of One",
        author: "Paul Jarvis",
        rating: 2.8,
        pages: 320,
        reviews: 110,
        totalRatings: 643,
        category: "Business",
        isbn: "978-1328972354",
        language: "English",
        quantity: 5,
        date: {
          published: { day: 15, month: 1, year: 2019 },
          addedToLibrary: { day: 10, month: 5, year: 2023 },
        },
        description: "Company of One offers a refreshingly original business strategy...",
      },
      {
        id: 3,
        image: books1,
        title: "Company of One",
        author: "Paul Jarvis",
        rating: 2.8,
        pages: 320,
        reviews: 110,
        totalRatings: 643,
        category: "Business",
        isbn: "978-1328972354",
        language: "English",
        quantity: 5,
        date: {
          published: { day: 15, month: 1, year: 2019 },
          addedToLibrary: { day: 10, month: 5, year: 2023 },
        },
        description: "Company of One offers a refreshingly original business strategy...",
      },
      {
        id: 4,
        image: books2,
        title: "Company of One",
        author: "Paul Jarvis",
        rating: 2.8,
        pages: 320,
        reviews: 110,
        totalRatings: 643,
        category: "Business",
        isbn: "978-1328972354",
        language: "English",
        quantity: 5,
        date: {
          published: { day: 15, month: 1, year: 2019 },
          addedToLibrary: { day: 10, month: 5, year: 2023 },
        },
        description: "Company of One offers a refreshingly original business strategy...",
      },
      {
        id: 5,
        image: books3,
        title: "Atomic Habits",
        author: "James Clear",
        rating: 4.8,
        pages: 320,
        reviews: 5120,
        totalRatings: 125043,
        category: "Self-Help",
        isbn: "978-0735211292",
        language: "English",
        quantity: 0,
        date: { published: { day: 16, month: 10, year: 2018 }, addedToLibrary: { day: 20, month: 11, year: 2022 } },
        description: "A practical guide on how to form good habits...",
      },
    ],
  },
  reducers: {
    addBook: (state, action) => {
      const lastBook = state.books[state.books.length - 1]; // Get the last book in the array
      const newId = lastBook ? lastBook.id + 1 : 1; // If books exist, increment; otherwise, start from 1
      state.books.push({ ...action.payload, id: newId });
    },
    editBook: (state, action) => {
      const { id, updatedBook } = action.payload;
      const book = state.books.find((book) => book.id === id);
      if (book) {
        Object.assign(book, updatedBook);
      }
    },
    removeBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
    },
  },
});

export const { addBook, editBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
