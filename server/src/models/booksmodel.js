import mongoose from 'mongoose'

const BooksSchema = mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true,
    },
    username: String,
    bookName:{
        type: String,
        required: true,
    },
    bookAuthor:{
        type: String,
        required: true,
    },
    bookGenre:{
        type: String,
        required: true,
    },
    bookImage: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    comments:[{type: Object}],
    rating: Object
})

export const BookModel = mongoose.model('books', BooksSchema)