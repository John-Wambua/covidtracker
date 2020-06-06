const express=require('express');
const router=express.Router();
const {Country}=require('../models/Country');

//Bar Graph data
router.get('/',(req,res)=>{

    Country.find({country: {$in: ['Kenya', 'Uganda','Tanzania, United Republic of','Rwanda','Burundi']}},(err,foundItems)=>{
        if(!err){
            if(foundItems){
                res.send(foundItems)
            }
        }else{
            res.send(err);
        }
    })
});

module.exports=router;