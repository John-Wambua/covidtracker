const express=require('express');
const mongoose=require('mongoose');
const helmet=require('helmet');
const cron=require('node-cron');
const historical=require('./routes/historicalData');
const global=require('./routes/globalStats');
const country=require('./routes/countries');
const barData=require('./routes/barData');
const {updateDB}=require('./models/Country');

mongoose.connect('mongodb+srv://admin-jwambua:9d15rmbVXSN6KYXY@covidproject-weksp.mongodb.net/covidProject',{useNewUrlParser: true,useUnifiedTopology:true});

const app=express();

app.use(helmet());
app.use('/api/historical',historical);
app.use('/api/globalStatistics',global);
app.use('/api/countryData',country);
app.use('/api/barData',barData);


// Schedule DB to update at 10:00am every morning
cron.schedule('00 00 10 * * 0-7', () => {
   updateDB();
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
