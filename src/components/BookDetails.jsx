import React, { Suspense } from 'react';
import '../styles/BookDetailscomp.css'
import { useSelector, useDispatch } from 'react-redux';
import * as Icon from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BookDetail({ cardId }) {
  const books = useSelector((state) => state.books.books);
  const filteredBook = books.find(book => book.id === cardId);

  if (!filteredBook) {
    return <div>Book not found.</div>;
  }

  const RatingStars = ({ rating }) => {
    const stars = Math.round(rating);
    return (
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <Icon.Star
            size={24}
            color="yellow"
            fill={index < stars ? 'yellow' : ''}
            key={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="book-detail">
      <div className="book-image">
        {/* Lazy load the book image */}
        <Suspense fallback={<div>Loading image...</div>}>
          <img
            src={filteredBook.image}
            alt={filteredBook.title}
            loading="lazy"
          />
        </Suspense>
      </div>

      <div className="book-title">{filteredBook.title}</div>
      <div className="book-author">{filteredBook.author}</div>

      <div className="book-rating">
        <span className="stars">
          <RatingStars rating={filteredBook.rating} />
        </span>
        <span className="rating-value">{filteredBook.rating}</span>
      </div>

      <div className="book-stats">
        <div>
          <span>{filteredBook.pages}</span> Pages
        </div>
        <div>
          <span>{filteredBook.totalRatings}</span> Ratings
        </div>
        <div>
          <span>{filteredBook.reviews}</span> Reviews
        </div>
      </div>

      <div className="book-description">
        {filteredBook.description}
      </div>
      <Link className="Link" to={`/BookDetailPage/${cardId}`}>
        <div className="book-button">
          Read Now <Icon.BookOpen />
        </div>
      </Link>
    </div>
  );
}
