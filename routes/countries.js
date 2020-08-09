const express=require('express');
const router=express.Router();
const {getAvailableCountries}=require('../controllers/allCountriesController')

//Available Countries
router.get('/',getAvailableCountries);
module.exports=router;
