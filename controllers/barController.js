const {Country}=require('../models/Country')
const ApiFeatures=require('../utils/apiFeatures')

exports.getBarData=(req,res,next)=>{

    const features=new ApiFeatures(Country.find(),req.query)
    features
        .filter()
        .sort()
        .limitFields();
    features.query.find({country: {$in: ['Kenya', 'Uganda','Tanzania, United Republic of','Rwanda','Burundi']}})
        .exec((err,countries)=>{
        if (err) return next(err)

        res.status(200).json({
            status:"success",
            results:countries.length,
            data:{
                countries
            }
        })
    })
}