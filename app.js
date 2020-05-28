const express=require('express');
const mongoose=require('mongoose');
const https = require('https');
const bodyParser=require('body-parser');
const axios=require('axios');

const port=3000;

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'))

mongoose.connect('mongodb://localhost/covidProject',{useNewUrlParser: true,useUnifiedTopology:true});

const countrySchema=new mongoose.Schema({
    country:String,totalConfirmed: Number,totalDeaths:Number,totalRecovered:Number,date:String
});

const Country=mongoose.model('Country',countrySchema);

const summaryURL=`https://api.covid19api.com//summary`;

//Overall Statistics
app.get('/globalStatistics',(req,res)=>{

    axios.get(summaryURL)
        .then(response => {
            res.send(response.data.Global);
        })
        .catch(error => {
            console.log(error);
        });

});

//Statistics per Country
app.get('/countryData',(req,res)=>{
    Country.find({}, (err, foundItems)=> {
        if(!err){
            if(foundItems){
                res.send(foundItems);
            }
        }else{
            res.send(err);
        }
    });

    // saveCountryData();

});

//Historical data -- Line graph
app.get('/historical/:countryName',(req,res)=>{

    const countryName=req.params.countryName;
    const histURL=`https://api.covid19api.com/total/dayone/country/${countryName}`;

    axios.get(histURL)
        .then(response => {
            const result=response.data;
            const final = {};
            for (let key in result){
                final[key] = {
                    "Country" : result[key]["Country"],
                    "Confirmed" : result[key]["Confirmed"],
                    "Deaths" : result[key]["Deaths"],
                    "Recovered" : result[key]["Recovered"],
                    "Active": result[key]["Active"],
                    "Date" : result[key]["Date"],
                };
            };
            res.send(final)
        })
        .catch(error => {
            res.send(error);
        });
});

app.get('/barData',(req,res)=>{

    Country.find({country: {$in: ['Kenya', 'Uganda','Tanzania, United Republic of','Rwanda','Burundi']}},(err,foundItems)=>{
        if(!err){
            if(foundItems){
                res.send(foundItems)
            }
        }else{
            res.send(err);
        }
    })

});

const saveCountryData=()=>{
    axios.get(summaryURL)
        .then(response => {
            response.data.Countries.forEach(country=>{
                const summary=new Country({
                    country:country.Country,
                    totalConfirmed: country.TotalConfirmed,
                    totalDeaths:country.TotalDeaths,
                    totalRecovered:country.TotalConfirmed,
                    date:country.Date,
                });

                Country.find({ date:country.Date}, (err, foundCases) =>{
                    if(foundCases){
                        console.log('Records are up to date')
                    }else{
                        summary.save(err=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log("Records inserted successfully!");
                            }
                        });
                    }
                });

            })
        })
        .catch(error => {
            console.log(error);
        });
}

// setInterval(()=>{
//     saveCountryData();
// },20000)




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})