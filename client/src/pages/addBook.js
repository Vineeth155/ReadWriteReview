import axios from 'axios';
import {useEffect, useState} from 'react'
import { useGetUserID } from '../components/hooks/useGetUserID';
import {useNavigate, useParams} from 'react-router-dom'
import './styles/addBook.css'
import { useCookies } from 'react-cookie';

export const AddBook = ({update}) => {
    const userID = useGetUserID();
    const navigate = useNavigate();
    const  bookID  = useParams();
    const [cookie, _] = useCookies(["access_token"])
    const [books, setBooks] = useState([])
    const [book, setBook] = useState({
        bookName:"",
        bookImage:"",
        bookAuthor:"",
        bookGenre:"",
        review:"",
        userID:userID,
    });

    useEffect(()=>{
        if(!update){
            const fetchBooks = async () =>{
                try{
                    const res = await axios.get(`${process.env.REACT_APP_URL}books/book-names`)
                    setBooks(res.data)
                }catch(err){console.error(err)}
            }
            fetchBooks()
        }
        else{
            const fetchBooks = async () =>{
                try{
                    const res = await axios.get(`${process.env.REACT_APP_URL}books/update/${bookID.id}`,{headers: {authorization: cookie.access_token}})
                    setBook(res.data)
                }catch(err){console.error(err)}
            }
            fetchBooks()
        }
    },[])

    const handleChange = e => {
        const { name, value } = e.target;
        setBook({...book, [name]:value });
    }
    const checkExistence = () => {
        let Exist=false;
        for(let i=0;i<books.length;i++){
            if(books[i].bookName==book.bookName && books[i].bookAuthor==book.bookAuthor) {Exist=true;break}
        }
        return Exist
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(checkExistence()){
            alert("Book Already Exists in Our Database!!!")
            return
        }
        if(!book.bookAuthor||!book.bookName||!book.review||!book.bookImage||!book.bookGenre){
            alert('All Fields Are Required Make Sure To Fill Them Appropriately!');
            return
        }
        try{
            await axios.post(`${process.env.REACT_APP_URL}books/add-book`,book,{headers: {authorization: cookie.access_token}})
            alert("added ")
            navigate('/')
        }catch(err){console.log(err)}
    }

    const onCancel = () => {
        navigate(`/books/${bookID.id}`)
    }

    const onUpdate = async(e) => {
        e.preventDefault();
        if(!book.bookAuthor||!book.bookName||!book.review||!book.bookImage||!book.bookGenre){
            alert('All Fields Are Required Make Sure To Fill Them Appropriately!');
            return
        }
        try{
            await axios.put(`${process.env.REACT_APP_URL}books/update/${bookID.id}`, book, {headers: {authorization: cookie.access_token}})
            alert("Update Successful!! ")
            navigate(`/books/${bookID.id}`)
        }catch(err){console.log(err)}
    }
    return(
        <div className='addBook'>
            <h1>Add BOOK</h1>
            <form className='bookForm' onSubmit={onSubmit}>
                <div className="left">
                    <label htmlFor="bookName">Book Name:</label>
                    <input type="text" name='bookName' value={book.bookName} id='bookName' onChange={handleChange}/>
                    <label htmlFor="bookAuthor">Book Author:</label>
                    <input type="text" name='bookAuthor' value={book.bookAuthor} id='bookAuthor' onChange={handleChange}/>
                    <label htmlFor="bookGenre">Book Genre:</label>
                    <input type="text" name='bookGenre' value={book.bookGenre} id='bookGenre' onChange={handleChange}/>
                </div>
                <div className="right">
                    <label htmlFor="review">Review:</label>
                    <textarea name="review" value={book.review} id="review" cols="30" rows="10" onChange={handleChange}></textarea>
                    <label htmlFor="bookImage">Book Image URL:</label>
                    <input type="text" name='bookImage' value={book.bookImage} id='bookImage' onChange={handleChange}/>
                </div>
            </form>
            <div className='submitButtons'>{update?(<><button className='submitButton' onClick={onCancel}>Cancel</button><button className='submitButton' onClick={onUpdate}>Update</button></>):<button className='submitButton' onClick={onSubmit}>Submit</button>}</div>
        </div>
    )
}