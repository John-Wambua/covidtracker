const mongoose=require('mongoose');
require('dotenv').config()

module.exports=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology:true
            });
    }catch (e) {
        winston.error('Problem with mongodb connection string',e);
    }

}