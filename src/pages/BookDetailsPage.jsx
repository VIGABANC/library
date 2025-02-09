import { useParams, useNavigate } from "react-router-dom";
import "../styles/BookDetailPage.css";
import { useSelector, useDispatch } from "react-redux";
import { addBorrowedBook, addFavoriteBook } from "../redux/slices/favbrowSlice";
import { FaHeart, FaBookOpen } from "react-icons/fa";
import { useState } from "react";

export default function BookDetailPage() {
  const { idbookCliced } = useParams();
  const books = useSelector((state) => state.books.books);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(idbookCliced));

  const [returnDate, setReturnDate] = useState("");
  const [showBorrowForm, setShowBorrowForm] = useState(false);

  const handleAddToFavorites = (bookId, userId) => {
    if (!userId) {
      alert("Please log in to add to favorites.");
      return;
    }
    dispatch(addFavoriteBook({ bookid: bookId, userid: userId }));
  };

  const handleBorrowRequest = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please log in to borrow a book.");
      return;
    }
    if (!returnDate) {
      alert("Please select a return date.");
      return;
    }
  
    const currentDate = new Date().toLocaleDateString(); 
    dispatch(
      addBorrowedBook({
        bookid: book.id,
        userid: userId,
        DateBorrowed: currentDate,
        DateofReturn: returnDate,
      })
    );
  
    setShowBorrowForm(false);
  };

  if (!book) {
    return (
      <div className="not-found">
        <p>Book not found. Please check the URL or try again later.</p>
      </div>
    );
  }

  return (
    <div className="book-details">
      <div className="book-header">
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-actions">
          <button className="btn borrow-btn" onClick={() => setShowBorrowForm(true)}>
            <FaBookOpen /> Borrow
          </button>
          <button className="btn favorite-btn" onClick={() => handleAddToFavorites(book.id, userId)}>
            <FaHeart /> Add to Favorite
          </button>
        </div>
      </div>

      {showBorrowForm && (
        <form className="borrow-form" onSubmit={handleBorrowRequest}>
          <label>
            Date to return:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary">Confirm Borrow</button>
          <button type="button" className="btn cancel-btn" onClick={() => setShowBorrowForm(false)}>Cancel</button>
        </form>
      )}

      <div className="book-info">
        <h1 className="book-title">{book.title}</h1>
        <h2 className="book-author">{book.author}</h2>

        <div className="book-meta">
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Published:</strong> {book.date.published.day}/{book.date.published.month}/{book.date.published.year}</p>
          <p><strong>Added to Library:</strong> {book.date.addedToLibrary.day}/{book.date.addedToLibrary.month}/{book.date.addedToLibrary.year}</p>
        </div>

        <div className="book-rating">
          <p><strong>Rating:</strong> {book.rating} ({book.totalRatings} ratings)</p>
          <p><strong>Reviews:</strong> {book.reviews} reviews</p>
        </div>

        <div className="book-description">
          <p><strong>Description:</strong></p>
          <p>{book.description}</p>
        </div>

        <div className="book-availability">
          <p><strong>Available:</strong> {book.quantity > 0 ? 'Yes' : 'No'}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
        </div>
      </div>
    </div>
  );
}
