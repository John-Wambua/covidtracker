const mongoose=require('mongoose');


const countrySchema=new mongoose.Schema({
    country:String,totalConfirmed: Number,totalDeaths:Number,totalRecovered:Number,date:String
},{
    toJSON: { virtuals: true }
});
countrySchema.virtual('recoveryRate').get(function () {
    return (this.totalRecovered/this.totalConfirmed)*100;
})
countrySchema.virtual('deathRate').get(function () {
    return (this.totalDeaths/this.totalConfirmed)*100;
})

//DOCUMENT MIDDLEWARE
countrySchema.pre('save',function(next) {
// tourSchema.pre('find',function(next) {
//   this.date=new Date(this.date);
    this.date=this.date.substring(0, 10);
    next();
})

const Country=mongoose.model('Country',countrySchema);

module.exports.Country=Country;
