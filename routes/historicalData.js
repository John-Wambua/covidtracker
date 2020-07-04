const express=require('express');
const router=express.Router();
const {getHistoricalData}=require('../controllers/historicalController')

// Line graph
router.get('/:countryName',getHistoricalData);
module.exports=router;
