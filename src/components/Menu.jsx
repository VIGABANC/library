import { Link ,useNavigate} from "react-router-dom";
import * as Icons from "lucide-react";
import "../styles/Menu.css";
import logo from "../images/logo.png";
import { useState } from "react";
import {  useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import {initialState } from '../redux/slices/userSlice'

function Menu({ toggleMenu, isMenuClosed }) {
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [state,setState] = useState(initialState )

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };
  const handleLogout = () => {
    dispatch(logoutUser()); 
    console.log("Current user after logout: ", state.currentUser); 
    console.log("IsAuthenticated after logout: ", state.isAuthenticated);
  
    localStorage.removeItem('authUser');
    localStorage.removeItem('isAuthenticated');
  
    navigate('/home');
  };
  
  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className={`sidebar ${isMenuClosed ? "close" : ""}`}>
        <header>
          <div className="image-text">
            <span className="imagge">
              <img src={logo} alt="logo" />
            </span>
            <div className="text header-text">
              <span className="name">Book Flow</span>
            </div>
          </div>
          <div className="menu-icon-container" onClick={toggleMenu}>
          {isMenuClosed?<Icons.ChevronRight className="menu-icon" size={32} />:<Icons.ChevronLeft className="menu-icon" size={32} />}
          </div>
        </header>
        <div className="menu-bar">
          <ul className="menu-link">
            <li
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              key="home"
            >
              <Link
                to="/home"
                className="link"
                onClick={() => handleLinkClick("home")}
              >
                <Icons.Home className="menu-icons" size={32} />
                <span className="text nav-text">Home</span>
              </Link>
            </li>
            <li
              className={`nav-link ${activeLink === "Books" ? "active" : ""}`}
            >
              <Link
                to="/BookList"
                className="link"
                onClick={() => handleLinkClick("Books")}
              >
                <Icons.Book className="menu-icons" size={32} />
                <span className="text nav-text">Books</span>
              </Link>
            </li>
            <li
              className={`nav-link ${activeLink === "Contact" ? "active" : ""}`}
            >
              <Link
                to="/Contact"
                className="link"
                onClick={() => handleLinkClick("Contact")}
              >
                <Icons.Contact className="menu-icons" size={32} />
                <span className="text nav-text">Contact</span>
              </Link>
            </li>
            <li
              className={`nav-link ${
                activeLink === "Dashboard" ? "active" : ""
              }`}
            >
              <Link
                to="/Dashboard"
                className="link"
                onClick={() => handleLinkClick("Dashboard")}
              >
                <Icons.LayoutDashboard className="menu-icons" size={32} />
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-link ${
                activeLink === "Settings" ? "active" : ""
              }`}
            >
              <Link
                to="/Setting"
                className="link"
                onClick={() => handleLinkClick("Settings")}
              >
                <Icons.Settings className="menu-icons" size={32} />
                <span className="text nav-text">Settings</span>
              </Link>
            </li>
            <li
              className={`nav-link ${activeLink === "logOut" ? "active" : ""}`}
              onClick={()=>handleLogout()}
            >
              <Link to="/" className="link">
                <Icons.LogOut className="menu-icons logOut" size={32} />
                <span className="text nav-text">Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
