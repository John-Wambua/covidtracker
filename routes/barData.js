const express=require('express');
const router=express.Router();
const {getBarData}=require('../controllers/barController');

//Bar Graph data
router.get('/',getBarData);

module.exports=router;