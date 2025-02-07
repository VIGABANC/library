import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icon from 'lucide-react';

export default function Header({ searchText, onSearchChange, UserAction }) {
  const [search, setSearch] = useState(searchText);
  const navigate = useNavigate();
  const [displayHidden, setDisplayHidden] = useState(true); 
  const userIconRef = useRef(null);
  const userContainerRef = useRef(null);
  const location = useLocation();

  const handleDisplayToggle = (e) => {
    setDisplayHidden(!displayHidden);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userIconRef.current && !userIconRef.current.contains(e.target) &&
        userContainerRef.current && !userContainerRef.current.contains(e.target)
      ) {
        setDisplayHidden(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/BookList/${search}`);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleLogin = () => {
    UserAction('login');

    const redirectPath = location.state?.from || "/home";
    navigate('/Login/login', { state: { from: redirectPath } });    
  };

  const handleSignUp = () => {
    UserAction('signUp');
    navigate('/Login/signUp');
  };

  return (
    <div className="Header-container">
      <div className="search-bar">
        <Icon.Search size={22} color="#AEB2C2" />
        <input
          type="text"
          placeholder="Search for a book, author, or topic..."
          className="search-input"
          value={search}
          onKeyDown={handleKeyDown}
          onChange={handleSearch}
        />
      </div>
      <div className="tool-bar">
        <Icon.Sun size={32} />
        <Icon.CircleUser
          className="UserIcon"
          size={32}
          onClick={handleDisplayToggle}
          style={{
            cursor: 'pointer',
          }}
          ref={userIconRef} // Attach reference to the user icon
        />
        <div
          className="userContainer"
          ref={userContainerRef} // Attach reference to the user container
          style={{
            display: displayHidden ? 'none' : 'block', // Use 'none' for complete hiding
          }}
        >
          <button className="LoginButton" onClick={handleLogin}>
            Login
          </button>
          <button className="SignupButton" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
