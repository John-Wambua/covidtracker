const express=require('express');
const router=express.Router();
const{displayContinentData,showContinents}=require('../controllers/continentController');

router.get('/',showContinents)
router.get('/:continent',displayContinentData);
module.exports=router;