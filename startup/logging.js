const winston=require('winston')
require('winston-mongodb');
require('dotenv').config()

module.exports=()=>{
    winston.exceptions.handle(
        new winston.transports.File({filename:'uncaughtExceptions.log'}),
        new winston.transports.Console({colorize:true,prettyPrint:true})
    );

    winston.add(new winston.transports.File({filename:'logfile.log'}))
    winston.add(new winston.transports.MongoDB({
        db:process.env.MONGO_URI,
        options:{
            useUnifiedTopology:true
        }
    }));

}