// components/BookList.js

import React, { useState } from 'react';
import Card from '../components/BookCard';
import Select from 'react-select';
import '../styles/BookList.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



export default function BookList({ searchTerm, idbookCliced }) {
  const [idbook, setIdBook] = useState(idbookCliced);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const books = useSelector((state) => state.books.books);

  

  const categories = ['All', ...new Set(books.map((book) => book.category))];
  const years = ['All', ...new Set(books.map((book) => book.date.published.year.toString()))];

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredBooks = books.filter((book) =>
    (book.title.toLowerCase().includes(normalizedSearch) ||
      book.category.toLowerCase().includes(normalizedSearch) ||
      book.author.toLowerCase().includes(normalizedSearch)) &&
    (categoryFilter === 'All' || !categoryFilter || book.category === categoryFilter) &&
    (languageFilter === 'All' || !languageFilter || book.language === languageFilter) &&
    (availabilityFilter === 'All' || book.available === (availabilityFilter === 'Yes')) &&
    (ratingFilter === 'All' || Math.floor(book.rating) === parseInt(ratingFilter)) &&
    (yearFilter === 'All' || book.date.published.year.toString() === yearFilter)
  );



  return (
    <div className="container">
      <div className="Categories">
        <Select
          options={categories.map((c) => ({ value: c, label: c }))}
          onChange={(e) => setCategoryFilter(e?.value || '')}
          isSearchable
          placeholder="Select Category"
          className="Genre Category"
        />

        <Select
          options={[
            { value: 'All', label: 'All' },
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          onChange={(e) => setAvailabilityFilter(e?.value || 'All')}
          isSearchable
          placeholder="Select Availability"
          className="Availability Category"
        />

        <Select
          options={years.map((y) => ({ value: y, label: y }))}
          onChange={(e) => setYearFilter(e?.value || 'All')}
          isSearchable
          placeholder="Select Year"
          className="PublicationYear Category"
        />

        <Select
          options={[
            { value: 'All', label: 'All' },
            { value: '5', label: '5 Stars' },
            { value: '4', label: '4 Stars' },
            { value: '3', label: '3 Stars' },
            { value: '2', label: '2 Stars' },
            { value: '1', label: '1 Star' },
          ]}
          value={{ value: ratingFilter, label: ratingFilter === 'All' ? 'All' : `${ratingFilter} Stars` }}
          onChange={(e) => setRatingFilter(e?.value || 'All')}
          isSearchable
          placeholder="Select Rating"
          className="Rating Category"
        />
      </div>

      <div className="BookList">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link to={`/BookDetailPage/${book.id}`} key={book.isbn}>
              <Card book={book} />
            </Link>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
