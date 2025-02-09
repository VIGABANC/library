import PropTypes from "prop-types";
import '../styles/BookCard.css'
export default function Card({ book, onClick }) {
  return (
    <div className="BooksContainer">
        <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img src={book.image} alt={book.title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">{book.author}</p>
      </div>
    </div>
    </div>
  );
}

// Define prop types
Card.propTypes = {
  book: PropTypes.shape({
    image: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    author: PropTypes.string.isRequired, 
  }).isRequired,
};
