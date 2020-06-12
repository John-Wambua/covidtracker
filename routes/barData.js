const express=require('express');
const router=express.Router();
const {Country}=require('../models/Country');

//Bar Graph data
router.get('/',(req,res,next)=>{

    Country.find({country: {$in: ['Kenya', 'Uganda','Tanzania, United Republic of','Rwanda','Burundi']}},(err,foundItems)=>{
       if (err) return next(err)
       if(!foundItems) return res.status(404).send('Not found');

       res.send(foundItems)
    })
});

module.exports=router;