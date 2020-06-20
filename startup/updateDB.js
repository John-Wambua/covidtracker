const axios=require('axios');
const {Country}=require('../models/Country');
const winston=require('winston');

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
const update=()=>{
    Country.deleteMany({}, (err)=>{
        if (err){
            winston.error(err.message,err)
            return res.status(500).send('Error updating db')
        }
        saveCountryData();
    });
}
update();