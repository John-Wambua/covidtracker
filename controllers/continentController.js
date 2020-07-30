const {Country}=require('../models/Country');
const ErrorHandler=require('../utils/errorHandler');
const ApiFeatures=require('../utils/apiFeatures');
const catchAsync=require('../utils/catchAsync');
const _=require('lodash');

const Africa = { $in: ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cape Verde','Cameroon','Central African Republic','Chad','Comoros','Congo (Brazzaville)','Congo (Kinshasa)','Cote d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Sao Tome and Principe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Swaziland','Tanzania, United Republic of','Togo','Tunisia','Uganda','Western Sahara','Zambia','Zimbabwe']}
const Europe={$in: ['Albania','Andorra','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Holy See (Vatican City State)','Hungary','Iceland','Ireland','Italy','Kazakhstan','Latvia','Liechtenstein','Lithuania','Luxembourg','Macedonia, Republic of','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Republic of Kosovo','Romania','Russian Federation','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine','United Kingdom']}
const Asia={$in: ['Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei Darussalam', 'Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran, Islamic Republic of','Iraq','Israel', 'Japan','Jordan','Kazakhstan','Korea (South)','Kuwait','Kyrgyzstan','Lao PDR','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestinian Territory','Philippines','Qatar','Russian Federation','Saudi Arabia','Singapore','Sri Lanka','Syrian Arab Republic (Syria)','Taiwan, Republic of China','Tajikistan','Thailand','TimorLeste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan','Viet Nam','Yemen']}
const NorthAmerica={$in: ['Antigua and Barbuda','Bahamas','Barbados','Belize','Canada','Costa Rica','Cuba','Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and Grenadines','Trinidad and Tobago','United States of America']}
const SouthAmerica={$in: ['Argentina', 'Bolivia','Brazil','Chile','Colombia','Ecuador','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela (Bolivarian Republic)']}
const Oceania={$in: ['Australia','Fiji','Kiribati','New Zealand','Papua New Guinea','Samoa','Solomon Islands','Tonga']}


const continentTotals=async (continent,next)=>{
    try {
        const totals = await Country.aggregate([
            {$match: {country: continent}},
            {
                $group: {
                    _id: null,
                    totalConfirmed: {$sum: '$totalConfirmed'},
                    totalRecoveries: {$sum: '$totalRecovered'},
                    totalDeaths: {$sum: '$totalDeaths'},
                }
            }
        ]);
        return totals;
    }catch (e) {
        next(e);
    }
}

const displayTotals=async (continent,next)=>{
    try {
        return _.map(await continentTotals(continent, next), _.partialRight(_.pick, ['totalConfirmed', 'totalRecoveries', 'totalDeaths']))
    }catch (e) {
        next(e);
    }

}

exports.showContinents=catchAsync(async (req,res,next)=>{
    const afrTotals=await displayTotals(Africa,next);
    const asiaTotals=await displayTotals(Asia,next);
    const euroTotals=await displayTotals(Europe,next);
    const northAmericaTotals=await displayTotals(NorthAmerica,next);
    const southAmericaTotals=await displayTotals(SouthAmerica,next);
    const oceaniaTotals=await displayTotals(Oceania,next);

    // console.log(afrTotals)
    res.status(200).json({
        status:'success',
        results:6,
        data:{
            continents:[
                {Continent:'Africa', Slug:'africa', CamelCase:'africa',totals:afrTotals},
                {Continent:'Asia', Slug:'asia', CamelCase:'asia',totals:asiaTotals},
                {Continent:'Europe', Slug:'europe', CamelCase:'europe',totals:euroTotals},
                {Continent:'North America', Slug:'north-america', CamelCase:'northAmerica',totals:northAmericaTotals},
                {Continent:'South America', Slug:'south-america', CamelCase:'southAmerica',totals:southAmericaTotals},
                {Continent:'Oceania', Slug:'oceania', CamelCase:'oceania',totals:oceaniaTotals},
            ]
        }
    })
})
exports.displayContinentData=(req,res,next)=>{

    const features=new ApiFeatures(Country.find(),req.query)
    const continent=_.camelCase(req.params.continent);

    let input;
    if (continent==='africa') input=Africa;
    else if (continent==='europe') input=Europe;
    else if (continent==='asia') input=Asia;
    else if (continent==='northAmerica') input=NorthAmerica;
    else if (continent==='southAmerica') input=SouthAmerica;
    else if (continent==='oceania') input=Oceania;
    else {
        return next(new ErrorHandler(new Error('Continent Not found'),404));
    }

    features
        .filter()
        .sort()
        .limitFields()
        .paginate();
    features.query.find({country:input})
        .exec((err,countries)=>{
        if(err) return next(err)
        res.status(200).json({
            status:"success",
            results:countries.length,
            continent:_.upperCase(req.params.continent),
            data:{
                countries
            }
        })
    });
}