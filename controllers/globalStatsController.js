const axios=require('axios');

const summaryURL=`https://api.covid19api.com/summary`;

exports.getGlobalStats=(req,res,next)=>{

    axios.get(summaryURL)
        .then(response => {
            const stats=response.data.Global;
            res.status(200).json({
                status:"success",
                results:stats.length,
                data:{
                    stats
                }
            });
        })
        .catch(error => {
            next(error);
        });

}
