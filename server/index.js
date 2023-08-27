import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './src/routes/users.js';
import { bookRouter } from './src/routes/books.js';
import dotenv from 'dotenv' 
dotenv.config()

const app = express();
// console.log(process.env.MONGODB_URI);
app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/books', bookRouter);
mongoose.connect(process.env.MONGODB_URI)


app.listen(process.env.PORT||3001,()=>{console.log("server started!!");});
