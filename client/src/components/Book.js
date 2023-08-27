import { useParams, useNavigate, Link } from 'react-router-dom';
import './book.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserID } from './hooks/useGetUserID';
import { useCookies } from 'react-cookie';
// import dotenv from 'dotenv'

export const Book = () => {
    // dotenv.config()
    const [book, setBook] = useState([])
    const [bookFlag, setBookFlag] = useState(false)
    const [cookie, _] = useCookies(["access_token"])
    const userID = useGetUserID()
    const navigate = useNavigate()
    const  bookID  = useParams();
    const [uploadData, setUploadData] = useState({
        bookID:bookID.id,
        userID:userID,
        deleteBook:false,
        comment:"",
        rating:0,
    })
    
    useEffect(() => {
        const fetchBook = async () =>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_URL}books/${bookID.id}`)
                setBook(res.data)
            }catch(err){console.error(err)}
            if(userID){
                try{
                    const savedBooksIDSRes = await axios.get(`${process.env.REACT_APP_URL}books/saved-books/ids/${userID}`)
                    setBookFlag([...savedBooksIDSRes.data].includes(bookID.id));
                }catch(err){console.error(err)}
            }
        }
        fetchBook()
        
      }, [bookID]);

      const saveBook = async(text) => {
        try{
            const res = await axios.put(`${process.env.REACT_APP_URL}books/${bookID.id}`,uploadData,{headers: {authorization: cookie.access_token}})
            alert(`Book ${text} Successfully!`)
            if(text=="Added")setBookFlag(true)
            if(text=="Removed")setBookFlag(false)
        }catch(err){console.error(err)}
      }

      const deleteBookFunction = async() => {
        try{
            let conf = window.confirm("Are You Sure, You Want to Delete This Review?")
            if(conf){
                const res = await axios.delete(`${process.env.REACT_APP_URL}books/${bookID.id}`,{headers: {authorization: cookie.access_token}})
                alert(`delete Successfully!`)
                navigate("/")
            }
            else alert('Book Not Deleted!')
        }catch(err){console.error(err)}
      }

      const bookRating = async() => {
          try{
              let userRating = prompt("Please Rate The Book Between 1-10!");
              setUploadData({...uploadData ,rating:userRating})
              if(userRating>=1&&userRating<=10){
                const res = await axios.post(`${process.env.REACT_APP_URL}books/${bookID.id}`,uploadData)
                alert("rated Successfully!!!")
                console.log(res, uploadData);
              }
              else{
                alert("The Rating Should Be Between 1-10.\n Please Try again!")
              }
            }catch(err){console.log(err)}
        }
    return (
        <div className="bookDetails">
                <div className="data">
                    <img src={book.bookImage} alt={book.bookName} srcSet="" />
                    <h2><i>{book.bookName}</i></h2>
                    <p>{book.bookGenre}</p>
                    <h3>Written by <span>{book.bookAuthor}</span></h3>
                    {cookie.access_token&&<div className="buttons">
                        {book.userID==userID&&<Link to={`/books/update/${book._id}`}><button className='saveBookButton'>Update</button></Link>}
                        {book.userID==userID&&<button className='saveBookButton' onClick={deleteBookFunction} >Delete</button>}
                        {userID ? (bookFlag ? <button className='saveBookButton' onClick={()=>saveBook("Removed")}>Saved</button> : <button className='saveBookButton' onClick={()=>saveBook("Added")}>Save</button>)
                            :<></>}
                    </div>}
                </div>
                <div className="bookReview">
                    <h3>Review by- <Link className='default' to={`/user/${book.userID}`}>{book.username}</Link></h3>
                    <div>
                    <p>{book.rating}</p>
                    {/* <button onClick={bookRating}>add rating</button> */}
                    <p>{book.review}</p>
                    </div>
                </div>
        </div>
    )
}