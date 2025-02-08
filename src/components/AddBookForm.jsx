import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/slices/booksSlice';
import '../styles/AddbookForm.css'

function AddBook({
  setShowAddBookForm,
  bookTitle: initialBookTitle = '',
  bookAuthor: initialBookAuthor = '',
  bookRating: initialBookRating = 0,
  bookPages: initialBookPages = '',
  bookisbn: initialBookisbn = '',
  bookpublishDate: initialBookpublishDate = '',
  bookcategory: initialBookcategory = '',
  bookLanguage: initialBookLanguage = '',
  bookQuantity: initialBookQuantity = '',
  bookDescription: initialBookDescription = '',
}) {
  const formRef = useRef(null);
  const dispatch = useDispatch(); // Redux dispatch hook

  const [bookTitle, setBookTitle] = useState(initialBookTitle);
  const [bookAuthor, setBookAuthor] = useState(initialBookAuthor);
  const [bookRating, setBookRating] = useState(initialBookRating);
  const [bookPages, setBookPages] = useState(initialBookPages);
  const [bookisbn, setBookisbn] = useState(initialBookisbn);
  const [bookpublishDate, setBookpublishDate] = useState(initialBookpublishDate);
  const [bookCover, setBookCover] = useState(null); // Store as base64 string
  const [bookcategory, setBookcategory] = useState(initialBookcategory);
  const [bookLanguage, setBookLanguage] = useState(initialBookLanguage);
  const [bookQuantity, setBookQuantity] = useState(initialBookQuantity);
  const [bookDescription, setBookDescription] = useState(initialBookDescription);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('')
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Biography'];
  const languages = ['English', 'French', 'Spanish'];
  useEffect(() => {
    setDate(bookpublishDate);
  }, [bookpublishDate]);
  useEffect(() => {
    if (bookpublishDate) {
      const dateArray = bookpublishDate.split('-');
      if (dateArray.length === 3) {
        setYear(dateArray[0]);
        setMonth(dateArray[1]);
        setDay(dateArray[2]);
      }
    }
  }, [bookpublishDate]);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = `/src/images/books/${file.name}`; 
      setBookCover(filePath); 
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      image: bookCover, 
      title: bookTitle,
      author: bookAuthor,
      rating: bookRating,
      pages: bookPages,
      category: bookcategory,
      isbn: bookisbn,
      language: bookLanguage,
      quantity: bookQuantity,
      description: bookDescription,
      date: {
         published:
          { day: day,
            month: month,
            year: year
      }}
    };
    dispatch(addBook(newBook));
    setShowAddBookForm(false);
  };
  
  

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddBookForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowAddBookForm]);

  return (
    <div className="addBook-overlay">
      <div className="addBook-container" ref={formRef}>
        <form className="addBook-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Title"
              className="input title"
              required
            />
          </div>
          <div className="input-group">
            <label>Author</label>
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Author"
              required
              className="input author"
            />
          </div>
          <div className="input-group">
            <label>Rating (0-5)</label>
            <input
              type="number"
              value={bookRating}
              required
              onChange={(e) => setBookRating(e.target.value)}
              placeholder="Rating (0-5)"
              min="0"
              max="5"
              className="input rating"
            />
          </div>
          <div className="input-group">
            <label>Pages</label>
            <input
              type="number"
              value={bookPages}
              required
              onChange={(e) => setBookPages(e.target.value)}
              placeholder="Pages"
              min="0"
              className="input pages"
            />
          </div>
          <div className="input-group">
            <label>ISBN</label>
            <input
              type="text"
              required
              value={bookisbn}
              onChange={(e) => setBookisbn(e.target.value)}
              placeholder="Example 0000-000000000"
              className="input isbn"
            />
          </div>
          <div className="input-group">
            <label>Publish Date</label>
            <input
              required
              type="date"
              value={bookpublishDate}
              onChange={(e) => setBookpublishDate(e.target.value)}
              className="input publishDate"
            />
          </div>
          <div className="input-group">
            <label>Book Cover</label>
            <input
              type="file"
              required
              onChange={handleFileChange}
              className="input bookCover"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div className="input-group">
            <label>Category</label>
            <select
              value={bookcategory}
              required
              onChange={(e) => setBookcategory(e.target.value)}
              className="input category"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Language</label>
            <select
              value={bookLanguage}
              required
              onChange={(e) => setBookLanguage(e.target.value)}
              className="input language"
            >
              <option value="">Select Language</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Description</label>
            <textarea
              value={bookDescription}
              required
              onChange={(e) => setBookDescription(e.target.value)}
              placeholder="Description"
              className="input description"
            />
          </div>
          <button type="submit" className="btn addBook-btn">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
