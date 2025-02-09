import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Dashboard from "./pages/Dachboard";
import Contact from "./pages/ContactUs";
import Setting from "./pages/Setting";
import BookDetail from "./components/BookDetails";
import BookList from "./pages/BooksList";
import Header from "./components/Header";
import BookDetailPage from "./pages/BookDetailsPage";
import Login from "./pages/login-signin";
import './styles/header.css';
import './App.css';

function App() {
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const [cardId, setCardId] = useState(null);
  const [isClick, setIsClick] = useState(false);
  const location = useLocation();
  const [idbooks, setIdBooks] = useState();
  const [UserAction, setUserAction] = useState("");
  const [UserId, setUserId] = useState(""); // In App

  
  

  const toggleMenu = () => {
    setIsMenuClosed((prev) => !prev);  // Toggle menu state
  };

  const handleCardClick = (id) => {
    setCardId(id);
    setIsClick(true);
    console.log("Card clicked with ID:", id);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
};
  useEffect(() => {
    setIsClick(false);
  }, [location]);

  // ============== Search =================
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (newSearchText) => {
    setSearchText(newSearchText);
  };

  console.log(searchText);

  return (
    <div className="app-container">
      <div
        className="HeaderContainer"
        style={{
          marginLeft: isMenuClosed ? "100px" : "220px",
          marginRight: isClick ? "240px" : "0",
          transition: "margin-left 0.4s ease-in-out, margin-right 0.4s ease-in-out",
        }}
      >
        <Header searchText={searchText}
         onSearchChange={handleSearchChange}
          UserAction={setUserAction}
        />
      </div>

      {/* Menu */}
      <div className="MenuContainer">
        <Menu toggleMenu={toggleMenu} isMenuClosed={isMenuClosed} />
      </div>

      <div
        className="main-content"
        style={{
          marginLeft: isMenuClosed ? "80px" : "210px",
          marginRight: isClick ? "230px" : "0",
          transition: "margin-left 0.3s ease-in-out, margin-right 0.3s ease-in-out",
        }}
      >
        <Routes>
          <Route path="/" element={<Home onCardClick={handleCardClick} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/BookList/:searchText" element={<BookList searchTerm={searchText} idbookCliced={idbooks} />} />
          <Route path="/BookList/" element={<BookList searchTerm={searchText} idbookCliced={idbooks} />} />
          <Route path="/Dashboard/:id" element={<Dashboard />} />
          <Route path="/Dashboard/" element={<Dashboard />} />

          <Route path="/Contact" element={<Contact />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Login/:UserAction" element={<Login UserId={setUserId} />} />
          <Route path="/Login/" element={<Login UserId={setUserId} />} />
          <Route path="/BookDetailPage/:idbookCliced" element={<BookDetailPage />} />
                  
        </Routes>
      </div>

      {isClick && cardId !== null && (
        <div className="BookDetails">
          <BookDetail cardId={cardId} />
        </div>
      )}
    </div>
  );
}

export default App;
