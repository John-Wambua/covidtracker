const express=require('express');
const router=express.Router();
const {getGlobalStats}=require('../controllers/globalStatsController')

//Overall Statistics
router.get('/',getGlobalStats);

module.exports=router;