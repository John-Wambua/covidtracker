const {Country}=require('../models/Country')
const ApiFeatures=require('../utils/apiFeatures')
const ErrorHandler=require('../utils/errorHandler')
const catchAsync=require('../utils/catchAsync')
const _=require('lodash')
// const update=require('../utils/updateDB')

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
                countries:_.map(countries, _.partialRight(_.pick, ['country', 'totalConfirmed', 'totalDeaths', 'totalRecovered', 'deathRate','recoveryRate','date']))
            }
        })
    });
}

exports.getSingleCountry = catchAsync(async (req,res,next)=>{
    const country = await Country.findOne({country:_.upperFirst(req.params.country)})
    if (!country) return next(new ErrorHandler('The country does not exist or input format is incorrect',404))
    res.status(200).json({
        status:'success',
        country:_.pick(country,['country', 'totalConfirmed', 'totalDeaths', 'totalRecovered', 'deathRate','recoveryRate','date'])
    })

})