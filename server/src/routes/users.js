import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/usersmodel.js';
import { BookModel } from '../models/booksmodel.js';

const router = express.Router();

router.post("/register",async(req,res)=>{
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});

    if(user){
        return res.json({message:"User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword});
    newUser.save();

    res.json({message:"User registered successfully!"});
});

router.post("/login", async(req,res)=>{
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message:"User doesn't exist!"});
    }

    const  isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({message:"User or password is incorrect!"});
    }

    const token = jwt.sign({id: user._id},"secret");
    res.json({token,userID: user._id});
});

router.get('/user/:id', async(req,res)=>{
    try{
        const books = await BookModel.find({userID:req.params.id});
        res.json(books);
    }catch(err){res.json(err)}
})

export {router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (err)=>{
            if(err) return res.sendStatus(403);
            next()
        })
    }
    else{
        res.sendStatus(401);
    }
}