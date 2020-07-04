const express=require('express');
const router=express.Router();
const {allCountries}=require('../controllers/countryController')
const {aliasTopConfirmed}=require('../middleware/aliasTopConfirmed')
const {aliasTopRecovered}=require('../middleware/aliasTopRecovered')
const {aliasTopDeaths}=require('../middleware/aliasTopDeaths')


router.get('/top-10-confirmed',aliasTopConfirmed,allCountries);
router.get('/top-10-recovered',aliasTopRecovered,allCountries);
router.get('/top-10-deaths',aliasTopDeaths,allCountries);
router.get('/',allCountries);

module.exports=router;
