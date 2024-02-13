const express=require('express');
const path=require('path');
const nocache =require('nocache')
const session=require("express-session");
const cookieParser = require('cookie-parser')
const{v4:uuidv4}=require("uuid");
const router=require('./router');

const app=express();


const port=process.env.PORT|| 3000;

app.use(cookieParser());
app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'uuidv4()',
    resave:false,
    saveUninitialized:true
}));
app.use('/',router);

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')))




app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")})