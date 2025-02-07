import {useState} from 'react'
import '../styles/home.css'; // Assuming you are adding styles for the Home page
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Card from '../components/BookCard';
import * as Icons from "lucide-react";
// import BookList from './BooksList';
export default function Home({  onCardClick  }) {
 const books = useSelector((state) => state.books.books);

    
    
  return (
    <div className="Container">
        <div className='Recommended '>
        <div className='header'>
        <h1>Recommended</h1>
        <Link className='Link'to='/BookList'>
        <span  className='Seeall'>See All

          <Icons.ChevronRight  className="menu-icons" size={42} />

          </span>
        </Link>
        
        </div>
        
        <div className='BooksContainer' >
        {books.slice(0,5).map((book) => (
          <Card key={book.id} book={book} 
          onClick={() => { 
      console.log("Book clicked with ID:", book.id);  // Log the book id here
      onCardClick(book.id);  // Then call the onCardClick function
    }}  
          />
        

      ))}
        </div>
            
        </div>
        <div className='Categories '>Book Categories </div>
        <div className='RecentlyAdded '>Recently Added </div>
        <div className='TopRatedBooks '>Top Rated Books </div>
    </div>
  );
}
