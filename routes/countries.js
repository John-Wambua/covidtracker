const express=require('express');
const router=express.Router();
const {Country}=require('../models/Country')
const update=require('../startup/updateDB')

//Statistics per Country
router.get('/',(req,res,next)=>{

    // update();
    Country.find({}, (err, foundItems)=> {

        if (err) return next(err);
        if(!foundItems) return res.status(404).send('Not found');

        res.send(foundItems);

    });
});

module.exports=router;
