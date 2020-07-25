const axios=require('axios');
const {Country}=require('../models/Country');
const mongoose=require('mongoose')
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
},err=>{
    if (err) return console.log('Could not connect to DB');
    console.log('Database Connected Successfully');
})
const summaryURL=`https://api.covid19api.com/summary`;
const saveCountryData=async ()=>{
    try {
        const response = await axios.get(summaryURL)
        await Promise.all(
            response.data.Countries.map(async country => {
                const summary = new Country({
                    country: country.Country,
                    totalConfirmed: country.TotalConfirmed,
                    totalDeaths: country.TotalDeaths,
                    totalRecovered: country.TotalRecovered,
                    date: country.Date,
                });

                await summary.save();
            })
        );
    }catch (e) {
        console.log(e)
    }

}
const updateData= async ()=>{
    try {
        await Country.deleteMany({});
        await saveCountryData();
        console.log('Data updated successfully')
        process.exit();
    }catch (e) {
        console.log(e)
    }

}
updateData();
// module.exports=update;
