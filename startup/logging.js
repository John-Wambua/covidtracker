const winston=require('winston')
require('winston-mongodb');
require('dotenv').config()

module.exports=()=>{
    try {
        winston.exceptions.handle(
            new winston.transports.File({filename: 'logs/uncaughtExceptions.log'}),
            new winston.transports.Console({colorize: true, prettyPrint: true})
        );

        winston.add(new winston.transports.File({filename: 'logs/logfile.log'}))
        winston.add(new winston.transports.MongoDB({
            db: 'mongodb://localhost/covidProject',
            options: {
                useUnifiedTopology: true
            }
        }));
    }
    catch (e) {
        winston.error(e.message)
    }

}