const express=require('express');
const router=express.Router();
const {Country}=require('../models/Country')
const update=require('../startup/updateDB')

//Statistics per Country
router.get('/',(req,res,next)=>{

    // update();
    Country.find({}, (err, countries)=> {

        if (err) return next(err);
        if(!countries) return res.status(404).send('Not found');

        res.status(200).json({
            status:"success",
            data:{
                countries
            }
        })

    });
});

module.exports=router;
