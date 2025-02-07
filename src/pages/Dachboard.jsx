import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard'
import Lists from '../components/lists';

import '../styles/Dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, removeBook, editBook } from '../redux/slices/booksSlice';
import * as Icons from 'lucide-react';
import AddBook from '../components/AddBookForm';
import { updateUser } from '../redux/slices/userSlice';
import { addBorrowedBook, returnBorrowedBook, addFavoriteBook, removeFavoriteBook } from '../redux/slices/favbrowSlice';

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState('user');
  const [userRole, setUserRole] = useState('user');
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const borrowedBooks = useSelector((state) => state.favbrow.borrowedBooks);
  const favoriteBooks = useSelector((state) => state.favbrow.favoriteBooks);
  // const { id } = useParams(); 
  // console.log("Raw useParams output:", id);
  
  const userId = useSelector((state) => state.user.userId) 
  console.log("userId from Redux:", userId);
  const currentuser = useSelector((state) => state.user.currentUser) 
  const user = users.find((user) => user.id == userId); 
  
  
  useEffect(() => {
    if (userId && users.length > 0) {
      const currentUser = users.find((user) => user.id == userId);
      if (currentUser) {
        setIsAdmin(currentUser.role === 'admin' ? 'admin' : 'user');
        setUserRole(currentUser.role);
      } else {
        console.error('User not found!');
        setIsAdmin('user');
        setUserRole('user');
      }
    }
  }, [userId, users,currentuser]);
  

  const handleRoleChange = (e, userId) => {
    const newRole = e.target.value;
    dispatch(updateUser({ id: userId, updatedData: { role: newRole } }));
  };

  const handleReturnBook = (bookid, userid) => {
    const book = books.find((book) => book.id === bookid);

    dispatch(returnBorrowedBook({ bookid, userid }));
    dispatch(editBook(book.quantity + 1));
  };

  const handleAddBook = (newBook) => {
    dispatch(addBook(newBook)); 
    setShowAddBookForm(false);
  };

  const handleRemoveBook = (id) => {
    dispatch(removeBook(id));
  };

  const handleEditBook = (id, updatedBook) => {
    dispatch(editBook({ id, updatedBook }));
  };
  const ListofUsersHead=["ID","Name","Email","Role","Edit","Role"]
  const ListofBooksHead=["ID","Title","Author","Quantity","Edit","Delete"]
  const ListofBorrowedBooksHead=["ID","Title","Author","Borrower","Return Date","Return",]
  const [Seeall2, setSeeall2]=useState(false)
  const [Seeall, setSeeall]=useState(false)
  const [Seeall3, setSeeall3]=useState(false)
  const handleSeeAll2 =()=>{
    setSeeall2(!Seeall2)
  }
  const handleSeeAll =()=>{
    setSeeall(!Seeall)
  }
  const handleSeeAll3 =()=>{
    setSeeall3(!Seeall3)
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {userRole === 'admin' ? (
        // Admin View
        <div className="admin">
          <div className="topTables">
            <div className="listOfUser">
              <div className="tablesHead">
                <h2>List of Users</h2>
              </div>
              <table className="users">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <select
                          className="Editerole"
                          value={user.role}
                          onChange={(e) => handleRoleChange(e, user.id)}
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="Seeall2" onClick={handleSeeAll2}>
                See All
                <Icons.ChevronRight className="menu-icons" size={32} />
              </button>
            </div>
            {Seeall2 && (
                  <Lists 
                      head={ListofUsersHead} 
                      body={users.map((user) => ({
                          "ID": user.id,
                          "Name": user.username,
                          "Email": user.email,
                          "Role": user.role,
                          "Edit Role": (
                              <select
                                  className="Editerole"
                                  value={user.role}
                                  onChange={(e) => handleRoleChange(e, user.id)}
                              >
                                  <option value="admin">Admin</option>
                                  <option value="user">User</option>
                              </select>
                          )
                      }))}  
                      showModal={Seeall2}
                      onCloseModal={() => setSeeall2(false)}                    
                  />
              )}

            <div className="listOfBorrowedBooks">
              <h2>Borrowed Books</h2>
              <table className="borrowedBooks">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User ID</th>
                    <th>Book ISBN</th>
                    <th>Date Borrowed</th>
                    <th>Date of Return</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {borrowedBooks.slice(0, 5).map((borrowedBook) => {
                      const user = users.find((user) => user.id === borrowedBook.userid);
                      const book = books.find((book) => book.id === borrowedBook.bookid);

                      return (
                        <tr key={borrowedBook.bookid}>
                          <td>{user ? user.username : 'Unknown User'}</td>
                          <td>{book ? book.title : 'Unknown Book'}</td>
                          <td>{borrowedBook.bookid}</td>
                          <td>{borrowedBook.DateBorrowed}</td>
                          <td>{borrowedBook.DateofReturn}</td>
                          <td>
                            <button className="returnBtn"
                            onClick={() => handleReturnBook(borrowedBook.bookid, borrowedBook.userid)}
                            >Return</button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <button className="SeeAll3" onClick={handleSeeAll3}>
              See All
              <Icons.ChevronRight className="menu-icons" size={32} />
            </button>
            
            </div>
            {Seeall3 && (
                <Lists 
                    head={ListofBorrowedBooksHead} 
                    body={borrowedBooks.map((borrowedBook) => {
                        const user = users.find((user) => user.id === borrowedBook.userid);
                        const book = books.find((book) => book.id === borrowedBook.bookid);

                        return {
                            "User Name": user ? user.username : "Unknown User",
                            "User ID": borrowedBook.userid,
                            "Book ISBN": borrowedBook.bookid,
                            "Date Borrowed": borrowedBook.DateBorrowed,
                            "Date of Return": borrowedBook.DateofReturn,
                            "Action": (
                                <button className="returnBtn"
                                    onClick={() => handleReturnBook(borrowedBook.bookid, borrowedBook.userid)}
                                >
                                    Return
                                </button>
                            )
                        };
                    })}  
                    showModal={Seeall3}
                    onCloseModal={() => setSeeall3(false)}                    
                />
            )}

          </div>

          <div className="listOfBooks">
            <div className="tablesHead">
              <h2>List of Books</h2>
              <button
                className="addBook"
                onClick={() => setShowAddBookForm(true)}
              >
                Add Book
              </button>
            </div>
            {showAddBookForm && (
              <AddBook
                handleAddBook={handleAddBook}
                setShowAddBookForm={setShowAddBookForm}
              />
            )}
            <table className="books">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Rating</th>
                  <th>ISBN</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.rating}</td>
                  <td>{book.isbn}</td>
                  <td colSpan={2} className="action">
                    <button className="editBtn">Edit</button>
                    <button className="removeBtn" onClick={() => handleRemoveBook(book.id)}>Remove</button>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            <button className="SeeAll" onClick={handleSeeAll}>
              See All
              <Icons.ChevronRight className="menu-icons" size={32} />
            </button>
          </div>
          {Seeall&&(
            <Lists 
              head={ListofBooksHead} 
              body={books.map((book) => ({
                  "ID": book.id,
                  "Title": book.title,
                  "Author": book.author,
                  "Genre": book.category,
                  "Rating": book.rating,
                  "ISBN": book.isbn,
                  "Actions": (
                    <div>
                        <button className="editBtn">Edit</button>
                        <button className="removeBtn" onClick={() => handleRemoveBook(book.id)}>Remove</button>
                    </div>
                  )
              }))}  
              showModal={Seeall}
              onCloseModal={() => setSeeall(false)}                    
            />
          )

          }
        </div>
      ) : (
        <div className="user">
          <h2>User Dashboard</h2>
          <div className="userContent">
          <p>Welcome! {user?.username || "guest"}, Here you can view your borrowed books and other details.</p>
          <div className="borrowedBooks">
            <table className="users">
                <thead>
                  <tr>
                    <th>Book Id</th>
                    <th>title</th>
                    <th>author</th>
                    <th>Date Borrowed</th>
                    <th>Date of Return</th>
                  </tr>
                </thead>
                <tbody>
                {borrowedBooks
                  .filter((borrowedBook) => borrowedBook.userid == userId) 
                  .map((borrowedBook) => {
                    const book = books.find((book) => book.id == borrowedBook.bookid);
                    
                    return (
                      <tr key={borrowedBook.bookid}>

                        <td>{borrowedBook.bookid}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{borrowedBook.DateBorrowed}</td>
                        <td>{borrowedBook.DateofReturn}</td>
                        <td></td>
                        {console.log(borrowedBook)}
                      </tr>
                    );
                  })}


                </tbody>
              </table>
            </div>
            <div className='myFavorites' >
                <h2>My Favorites</h2>
                <div className='favbookCard'>
                {favoriteBooks
                .filter((favoriteBook) => favoriteBook.userid == userId)  
                  .map((favoriteBook) => {
                    const book = books.find((book) => book.id == favoriteBook.bookid);
                    
                  if (!book) return null; // Prevent accessing properties of undefined
                  return <BookCard key={book.id} book={book} />;
                })}

                  
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
