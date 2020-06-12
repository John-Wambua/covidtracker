const express=require('express');
const router=express.Router();
const axios=require('axios');

const summaryURL=`https://api.covid19api.com//summary`;

//Overall Statistics
router.get('/',(req,res,next)=>{

    axios.get(summaryURL)
        .then(response => {
            res.send(response.data.Global);
        })
        .catch(error => {
            next(error);
        });

});

module.exports=router;