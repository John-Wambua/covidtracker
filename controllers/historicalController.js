const axios=require('axios');

exports.getHistoricalData=(req,res,next)=>{

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
            res.status(200).json({
                status:"success",
                results:result.length,
                data:{
                    countries:result
                }
            })
        })
        .catch(error => {
            next(error);
        });
}