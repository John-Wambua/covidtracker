const express=require('express');
const router=express.Router();
const{displayContinents}=require('../controllers/continentController');


router.get('/:continent',displayContinents);
module.exports=router;