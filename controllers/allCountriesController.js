const axios=require('axios');

exports.getAvailableCountries=(req,res,next)=>{

    const summaryURL=`https://api.covid19api.com/summary`;

    axios.get(summaryURL)
        .then(response => {
            let result=response.data.Countries;

            for(let i = 0; i < result.length; i++) {
                delete result[i]['NewConfirmed'];
                delete result[i]['TotalConfirmed'];
                delete result[i]['NewDeaths'];
                delete result[i]['TotalDeaths'];
                delete result[i]['NewRecovered'];
                delete result[i]['TotalRecovered'];
                delete result[i]['Date'];
                delete result[i]['Premium'];

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