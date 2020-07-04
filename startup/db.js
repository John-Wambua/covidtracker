const mongoose=require('mongoose');
require('dotenv').config()
const winston=require('winston')

module.exports=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology:true
            });
        winston.info('Database Connected successfully')
    }catch (e) {
        winston.error('Problem with mongodb connection string',e);
        console.log(e);
    }

}