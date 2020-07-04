const {Country}=require('../models/Country')

exports.getBarData=(req,res,next)=>{

    Country.find({country: {$in: ['Kenya', 'Uganda','Tanzania, United Republic of','Rwanda','Burundi']}},(err,countries)=>{
        if (err) return next(err)
        if(!countries) return res.status(404).send('Not found');

        res.status(200).json({
            status:"Success",
            results:countries.length,
            data:{
                countries
            }
        })
    })
}