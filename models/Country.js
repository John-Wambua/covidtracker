const mongoose=require('mongoose');
const axios=require('axios');

const countrySchema=new mongoose.Schema({
    country:String,totalConfirmed: Number,totalDeaths:Number,totalRecovered:Number,date:String
});

const Country=mongoose.model('Country',countrySchema);

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

module.exports.Country=Country;
module.exports.updateDB=updateDB;