const express=require('express');
const winston=require('winston')
require('winston-mongodb');
const mongoose=require('mongoose');
const helmet=require('helmet');
const cron=require('node-cron');
const historical=require('./routes/historicalData');
const global=require('./routes/globalStats');
const country=require('./routes/countries');
const barData=require('./routes/barData');
const {Country}=require('./models/Country');
const error=require('./middleware/error');
const app=express();
const axios=require('axios');


mongoose.connect('mongodb+srv://admin-jwambua:9d15rmbVXSN6KYXY@covidproject-weksp.mongodb.net/covidProject',{useNewUrlParser: true,useUnifiedTopology:true});

winston.add(new winston.transports.File({filename:'logfile.log'}))
winston.add(new winston.transports.MongoDB({db:'mongodb+srv://admin-jwambua:9d15rmbVXSN6KYXY@covidproject-weksp.mongodb.net/covidProject'}))


app.use(helmet());
app.use('/api/historical',historical);
app.use('/api/globalStatistics',global);
app.use('/api/countryData',country);
app.use('/api/barData',barData);
app.use(error);

const summaryURL=`https://api.covid19api.com//summary`;
const saveCountryData=()=>{
    axios.get(summaryURL)
        .then(response => {
            response.data.Countries.forEach(country=>{
                const summary=new Country({
                    country:country.Country,
                    totalConfirmed: country.TotalConfirmed,
                    totalDeaths:country.TotalDeaths,
                    totalRecovered:country.TotalRecovered,
                    date:country.Date,
                });

                summary.save(err=>{
                    if (err) return err
                    // res.send('Inserted ')
                });
            })
        })
        .catch(error => {
            console.log(error);
        });
}
const updateDB=()=>{
    Country.deleteMany({}, (err)=>{
        if (err) return err
        saveCountryData();
    });
}
// Schedule DB to update at 11:00am every morning
const task=cron.schedule('0 11 * * 0-7', () => {
   updateDB();
   winston.info('Database updated!');
},{
    scheduled:true,
    timezone:"Africa/Nairobi"
});
task.start();
// cron.schedule('00 00 10 * * 0-7', () => {
//     updateDB();
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
