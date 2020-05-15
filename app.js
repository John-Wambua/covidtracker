const express=require('express');
const mongoose=require('mongoose');
const https = require('https');

const port=3000;

const app=express();

app.use(express.static('public'))

mongoose.connect('mongodb://localhost/covidtrackerDatabase',{useNewUrlParser: true,useUnifiedTopology:true});

app.get('/',(req,res)=>{
    res.send('<h1>Hello!</h1>');
})


const countrySchema=new mongoose.Schema({
    reportDate:String,confirmedCases: Number,deaths: Number,recoveredCases: Number,activeCases: Number,recoveredCases:Number,activeCases:Number,confirmed_diff:Number,deaths_diff:Number,recovered_diff:Number,fatality_rate: Number,countryName: String,
});

const Country=mongoose.model('Country',countrySchema);


// console.log(new Date().getDay());
const date='2020-05-08';
const country='Kenya';

const url=`https://covid-api.com/api/reports?date=${date}&region_name=${country}`;

https.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);

    res.on('data', (data) => {
        // process.stdout.write(d);
        const countryData=JSON.parse(data);

        const countryReports={
            reportDate:countryData.data[0].date,
            confirmedCases:countryData.data[0].confirmed,
            deaths:countryData.data[0].deaths,
            recoveredCases:countryData.data[0].recovered,
            activeCases:countryData.data[0].active,
            confirmed_diff:countryData.data[0].confirmed_diff,
            deaths_diff:countryData.data[0].deaths_diff,
            recovered_diff:countryData.data[0].recovered_diff,
            fatality_rate:countryData.data[0].fatality_rate,
            countryName:countryData.data[0].region.name
        }

        console.log(countryReports);

        const kenya=new Country({
            reportDate:countryReports.reportDate,
            confirmedCases: countryReports.confirmedCases,
            deaths: countryReports.deaths,
            recoveredCases: countryReports.recoveredCases,
            activeCases: countryReports.activeCases,
            recoveredCases:countryReports.recovered_diff,
            activeCases:countryReports.activeCases,
            confirmed_diff:countryReports.confirmed_diff,
            deaths_diff:countryReports.deaths_diff,
            recovered_diff:countryReports.recovered_diff,
            fatality_rate: countryReports.fatality_rate,
            countryName: countryReports.countryName,
        });
        // kenya.save();

    });

}).on('error', (e) => {
    console.error(e);
});




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})