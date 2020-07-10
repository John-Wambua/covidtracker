const express=require('express');
const router=express.Router();
const {getCountriesData}=require('../controllers/countryDataController')
const {monthlyStats}=require('../controllers/countryDataController')
const {aliasTopConfirmed}=require('../middleware/aliasTopConfirmed')
const {aliasTopRecovered}=require('../middleware/aliasTopRecovered')
const {aliasTopDeaths}=require('../middleware/aliasTopDeaths')


router.get('/top-10-confirmed',aliasTopConfirmed,getCountriesData);
router.get('/top-10-recovered',aliasTopRecovered,getCountriesData);
router.get('/top-10-deaths',aliasTopDeaths,getCountriesData);
router.get('/',getCountriesData);
router.get('/monthly-stats/:year',monthlyStats)

module.exports=router;
