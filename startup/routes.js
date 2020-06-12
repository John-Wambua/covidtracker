const express=require('express');
const helmet=require('helmet');
const historical=require('../routes/historicalData');
const global=require('../routes/globalStats');
const country=require('../routes/countries');
const barData=require('../routes/barData');
const error=require('../middleware/error');

module.exports=app=>{
    app.use(helmet());
    app.use('/api/historical',historical);
    app.use('/api/globalStatistics',global);
    app.use('/api/countryData',country);
    app.use('/api/barData',barData);
    app.use(error);
}