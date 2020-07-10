const express=require('express');
const morgan=require('morgan');

const ErrorHandler=require('./utils/errorHandler')
const globalErrorHandler=require('./middleware/globalErrorHandler');

const historical=require('./routes/historicalData');
const global=require('./routes/globalStats');
const countryData=require('./routes/countriesData');
const barData=require('./routes/barData');
const continents=require('./routes/continents');
const allCountries=require('./routes/countries');


const app=express();

//MIDDLEWARE
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

//ROUTES
app.use('/api/historical',historical);
app.use('/api/globalStatistics',global);
app.use('/api/countryData',countryData);
app.use('/api/barData',barData);
app.use('/api/continents',continents);
app.use('/api/countries',allCountries);

app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Cannot find ${req.originalUrl} on this server!`,404))
})

app.use(globalErrorHandler);

module.exports=app;


