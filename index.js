const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const User=require('./models/user.model');
const {auth} =require('./middlewares/auth');
const routes = require('./routes')
const dbInitialize = require('./lib/mongo.db')

const app=express();

const boot = async () => {
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    app.use(cookieParser());

    app.use('/api', routes);
    // listening port
    const PORT=process.env.PORT||8080;
    app.listen(PORT,()=>{
        dbInitialize();
        console.log(`app is live at ${PORT}`);
    });
}

boot()