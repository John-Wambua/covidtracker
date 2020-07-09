const {Country}=require('../models/Country');
const ErrorHandler=require('../utils/errorHandler');
const ApiFeatures=require('../utils/apiFeatures');

const Africa = { $in: ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cape Verde','Cameroon','Central African Republic','Chad','Comoros','Congo (Brazzaville)','Congo (Kinshasa)','Cote d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Sao Tome and Principe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Swaziland','Tanzania, United Republic of','Togo','Tunisia','Uganda','Western Sahara','Zambia','Zimbabwe']}
const Europe={$in: ['Albania','Andorra','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Holy See (Vatican City State)','Hungary','Iceland','Ireland','Italy','Kazakhstan','Latvia','Liechtenstein','Lithuania','Luxembourg','Macedonia, Republic of','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Republic of Kosovo','Romania','Russian Federation','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine','United Kingdom']}
const Asia={$in: ['Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei Darussalam', 'Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran, Islamic Republic of','Iraq','Israel', 'Japan','Jordan','Kazakhstan','Korea (South)','Kuwait','Kyrgyzstan','Lao PDR','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestinian Territory','Philippines','Qatar','Russian Federation','Saudi Arabia','Singapore','Sri Lanka','Syrian Arab Republic (Syria)','Taiwan, Republic of China','Tajikistan','Thailand','TimorLeste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan','Viet Nam','Yemen']}
const NorthAmerica={$in: ['Antigua and Barbuda','Bahamas','Barbados','Belize','Canada','Costa Rica','Cuba','Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and Grenadines','Trinidad and Tobago','United States of America']}
const SouthAmerica={$in: ['Argentina', 'Bolivia','Brazil','Chile','Colombia','Ecuador','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela (Bolivarian Republic)']}
const Oceania={$in: ['Australia','Fiji','Kiribati','New Zealand','Papua New Guinea','Samoa','Solomon Islands','Tonga']}

exports.displayContinents=(req,res,next)=>{

    const features=new ApiFeatures(Country.find(),req.query)
    const continent=req.params.continent;
    let input;
    if (continent==='Africa') input=Africa;
    else if (continent==='Europe') input=Europe;
    else if (continent==='Asia') input=Asia;
    else if (continent==='NorthAmerica') input=NorthAmerica;
    else if (continent==='SouthAmerica') input=SouthAmerica;
    else if (continent==='Oceania') input=Oceania;
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
            data:{
                countries
            }
        })
    });
}