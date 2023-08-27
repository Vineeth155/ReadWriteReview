import axios from 'axios'
import {useEffect, useState} from 'react'
import './styles/home.css'
import { Link, useParams } from 'react-router-dom'

export const Home = ({user}) => {
    const [books, setBooks] = useState([])
    const [username, setUsername] = useState("")
    const  userID  = useParams();

    useEffect(()=>{
        const fetchBooks = async () =>{
            if(!user){
                try{
                    const res = await axios.get(`${process.env.REACT_APP_URL}books`)
                    setBooks(res.data)
                }catch(err){console.error(err)}
            }
            else{
                try{
                    const res = await axios.get(`${process.env.REACT_APP_URL}auth/user/${userID.id}`)
                    setBooks(res.data)
                    setUsername(res.data[0].username)
                }catch(err){console.error(err)}
            }
        }
        fetchBooks()
    },[user])

    return(
        <div className='home'>
            <h1>{user?<>Reviews By: <span className='default'>{username}</span></>:"Books"}</h1>
            <div className="booksContainer">
                {books&&books.map((book)=>( 
                    <Link className='linkTag' to={`/books/${book._id}`} key={book._id}>
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