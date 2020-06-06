const express=require('express');
const router=express.Router();
const axios=require('axios');

// Line graph
router.get('/:countryName',(req,res)=>{

    const countryName=req.params.countryName;
    const histURL=`https://api.covid19api.com/total/dayone/country/${countryName}`;

    axios.get(histURL)
        .then(response => {
            let result=response.data;

            for(let i = 0; i < result.length; i++) {
                delete result[i]['CountryCode'];
                delete result[i]['Province'];
                delete result[i]['City'];
                delete result[i]['CityCode'];
                delete result[i]['Lat'];
                delete result[i]['Lon'];
            }
            res.send(result);
        })
        .catch(error => {
            res.send(error);
        });
});
module.exports=router;
