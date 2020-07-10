const {Country}=require('../models/Country')
const ApiFeatures=require('../utils/apiFeatures')
const update=require('../utils/updateDB')

exports.getCountriesData=(req,res,next)=>{
    // update();
    const features=new ApiFeatures(Country.find(),req.query);
    features
        .filter()
        .sort()
        .limitFields()
        .paginate()
    features.query.exec( (err, countries)=> {
        if (err) return next(err);
        res.status(200).json({
            status:"success",
            page:features.page,
            results:countries.length,
            data:{
                countries
            }
        })
    });
}
exports.monthlyStats=(req,res,next)=>{
    const year=req.params.year;
    Country.aggregate([
        {
            $match: {
                totalConfirmed: {
                    $gte:10000
                }

            }
        },
        {
            $group:{
                _id: {
                    month:{$substr:['$date',5,2]}
                },
                totalCases: {$sum:'$totalConfirmed'},
                totalRecoveries: {$sum:'$totalRecovered'},
                totalDeaths: {$sum:'$totalDeaths'},
            }
        },
        {
            $sort:{totalCases: -1}
        }

    ]).exec((err,stats)=>{
        if (err) return next(err)
        if (!stats) return res.send('No tours found')
        res.status(200).json({
            status:'success',
            results:stats.length,
            data:{
                stats
            }
        })
    });
}