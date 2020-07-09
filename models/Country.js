const mongoose=require('mongoose');


const countrySchema=new mongoose.Schema({
    country:String,totalConfirmed: Number,totalDeaths:Number,totalRecovered:Number,date:String
},{
    toJSON: { virtuals: true }
});
countrySchema.virtual('recoveryRate').get(function () {
    const recoveryRate=(this.totalRecovered/this.totalConfirmed)*100;

    return Math.round((recoveryRate + Number.EPSILON) * 100) / 100
})
countrySchema.virtual('deathRate').get(function () {
    const deathRate=(this.totalDeaths/this.totalConfirmed)*100;
    return Math.round((deathRate + Number.EPSILON) * 100) / 100
})

//DOCUMENT MIDDLEWARE
countrySchema.pre('save',function(next) {

    this.date=this.date.substring(0, 10);
    next();
})

const Country=mongoose.model('Country',countrySchema);

module.exports.Country=Country;
