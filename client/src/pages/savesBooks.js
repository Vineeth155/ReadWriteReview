import axios from "axios";
import { useEffect, useState } from "react"
import { useGetUserID } from "../components/hooks/useGetUserID";
import { Link } from "react-router-dom";

export const SavedBooks = () => {

    const [savedBooks, setSavedBooks] = useState([])
    const userID = useGetUserID()

    useEffect(() => {
        const fetchSavedBooks = async() =>{
            try{
            const books = await axios.get(`${process.env.REACT_APP_URL}books/saved-books/${userID}`)
            setSavedBooks(books.data.savedBooks)
            // console.log(books.data.savedBooks);
            } catch(err){console.log(err);}
        }
        fetchSavedBooks()
    }, []);
    return(
        <div className='home'>
            <h1>Saved Books</h1>
            <div className="booksContainer">
                {savedBooks.map((book)=>( 
                    <Link className="linkTag" key={book._id} to={`/books/${book._id}`}>
                        <div>
                            <div className="book">
                                <img src={book.bookImage} alt={book.bookName} srcSet="" />
                                <h3>{book.bookName}</h3>
                                <p>- {book.bookAuthor}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
    )
}