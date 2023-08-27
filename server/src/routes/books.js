import express from 'express';
import { BookModel } from '../models/booksmodel.js';
import { UserModel } from '../models/usersmodel.js';
import { verifyToken } from './users.js'

const router = express.Router();

router.get('/',async (req,res)=>{
    try{
    const books = await BookModel.find();
    res.json(books);
    }catch(err){res.json(err)}
})

router.get('/book-names',async(req,res)=>{
    try{
        const books = await BookModel.find();
        let bookNames=[]
        books.forEach(book => {
            bookNames.push({bookName:book.bookName,bookAuthor:book.bookAuthor})
        })
        res.json(bookNames)
        }catch(err){res.json(err)}
})

router.post('/add-book', verifyToken, async(req,res)=>{
    try{
        const { userID, bookName, bookAuthor, bookGenre, bookImage, review } = req.body;
        const user = await UserModel.findById(userID)
        const book = await BookModel.findOne({bookName});
        let allowed = false;

        if(book && book.bookAuthor==bookAuthor){
            return res.json({message:"Book already exists!"});
        }
        else if(book && bookAuthor!=book.bookAuthor){
            allowed = confirm(`Book Already Publish in Our Database With Author: ${book.bookAuthor} .\n Press 'Okay' To Review That Book Before Publishing. \n Press 'Cancel' To Publish Your Review Anyway`)
        }
        if(allowed){ res.redirect(`/book/${book._id}`)}
            const newBook = new BookModel({userID, username:user.username, bookName, bookAuthor, bookGenre, bookImage, review})
            newBook.save();
            res.json({message:"Book Added Successfully!"});
    } catch(err){res.json(err)}
})

router.route('/:id').get(async(req,res)=>{
    try{
        const book = await BookModel.findById(req.params.id);
        res.json(book);
    } catch(er){
        res.json(er)
    }
}).post(verifyToken, async(req,res)=>{
    const {userID, comment, bookImage, rating} = req.body;
    try{
        const user = await UserModel.findById(userID)
        const book = await BookModel.findById(req.params.id);
        book.rating?Object.assign(book.ranting):book.ranting=rating;
        if(comment){
            book.comments.push({username:user.username, comment});
            book.save();
            res.json({message: 'Comment Sent!'});
        }
        else if(bookImage){
                book.bookImage=bookImage;
                book.save();
                res.json({message: "Book Image Updated Successfully!"});
            }
    } catch(err){ res.json(rrr)}
}).put(verifyToken, async(req,res)=>{
    try{
        const book = await BookModel.findById(req.body.bookID);
        const user = await UserModel.findById(req.body.userID);
        if(!user.savedBooks.includes(book._id)){
            user.savedBooks.push(book)
            await user.save()
        }
        else{
            user.savedBooks.splice(user.savedBooks.indexOf(book._id),1)
            await user.save()
        }
        res.json({savedBooks:user.savedBooks})
    }
    catch(err){
        res.json(err)
    }
}).delete(verifyToken, async(req,res)=>{
    try{
        const book = await BookModel.findOneAndDelete({_id: req.params.id});
        await book.save()
    }catch(err){res.json(err)}
})

router.route("/update/:id").get(verifyToken, async(req,res)=>{
    try{
        const book = await BookModel.findById(req.params.id);
        res.json(book);
    } catch(er){
        res.json(er)
    }
}).put(verifyToken, async(req,res)=>{
    try{
        const updatedBook = req.body
        const book = await BookModel.findOneAndUpdate({_id:req.params.id},updatedBook,{new:true});
        book.save();
        res.json({message:"Book Successfully Updated!!"})
    } catch(err){
        res.json(err)
    }
})


router.route('/saved-books/ids/:userID').get(async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.send(user.savedBooks)
    }catch(err){
        res.json(err)
    }
})
router.get("/saved-books/:userID",async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedBooks = await BookModel.find({
            _id:{$in: user.savedBooks}
        })
        res.json({savedBooks})
    } catch(err){
        res.json(err)
    }
})

export { router as bookRouter };