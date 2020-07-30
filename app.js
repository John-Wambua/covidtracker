const express=require('express');
const morgan=require('morgan');
const hpp=require('hpp');
const helmet=require('helmet')
const xss=require('xss-clean')

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
//Set HTTP security headers
app.use(helmet())
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
//Data sanitization against XSS
app.use(xss())
//prevent parameter pollution
app.use(hpp())

//ROUTES
app.use('/historical',historical);
app.use('/globalStatistics',global);
app.use('/countryData',countryData);
app.use('/barData',barData);
app.use('/continents',continents);
app.use('/countries',allCountries);

app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Cannot find ${req.originalUrl} on this server!`,404))
})

app.use(globalErrorHandler);

module.exports=app;


