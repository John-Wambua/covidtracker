const express=require('express');
const router=express.Router();
const {Country}=require('../models/Country')

//Statistics per Country
router.get('/',(req,res)=>{

    Country.find({}, (err, foundItems)=> {
        if(!err){
            if(foundItems){
                res.send(foundItems);
            }
        }else{
            res.send(err);
        }
    });
});

module.exports=router;
