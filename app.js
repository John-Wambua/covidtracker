const express=require('express');
const mongoose=require('mongoose');
const https = require('https');
const bodyParser=require('body-parser');

const port=3000;

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'))

mongoose.connect('mongodb://localhost/covidtrackerDB',{useNewUrlParser: true,useUnifiedTopology:true});

const countrySchema=new mongoose.Schema({
    reportDate:String,confirmedCases: Number,deaths: Number,recoveredCases: Number,activeCases: Number,recoveredCases:Number,activeCases:Number,confirmed_diff:Number,deaths_diff:Number,recovered_diff:Number,fatality_rate: Number,countryName: String,
});

const Report=mongoose.model('Report',countrySchema);

//
// const today  = new Date().toISOString().split('T')[0];
//

app.route('/reports/:countryName')
    .get((req,res)=>{
        Report.find({countryName:req.params.countryName},(err,foundReports)=>{
            if(!err){
                res.send(foundReports);

            }else{
                res.send(err);
            }
        })

    })
    .post((req,res)=>{

        const reportDate=req.body.date;//'2020-05-15'
        const country=req.params.countryName;

        const url=`https://covid-api.com/api/reports?date=${reportDate}&region_name=${country}`;

        https.get(url, (resp) => {
            console.log('statusCode:', resp.statusCode);
            // console.log('headers:', res.headers);

            resp.on('data', (data) => {
                // process.stdout.write(d);
                const countryData=JSON.parse(data);

                const countryReports={
                    reportDate:countryData.data[0].date,
                    confirmedCases:countryData.data[0].confirmed,
                    deaths:countryData.data[0].deaths,
                    recoveredCases:countryData.data[0].recovered,
                    activeCases:countryData.data[0].active,
                    confirmed_diff:countryData.data[0].confirmed_diff,
                    deaths_diff:countryData.data[0].deaths_diff,
                    recovered_diff:countryData.data[0].recovered_diff,
                    fatality_rate:countryData.data[0].fatality_rate,
                    countryName:countryData.data[0].region.name
                }

                // console.log(countryReports);

                const country=new Report({
                    reportDate:countryReports.reportDate,
                    confirmedCases: countryReports.confirmedCases,
                    deaths: countryReports.deaths,
                    recoveredCases: countryReports.recoveredCases,
                    activeCases: countryReports.activeCases,
                    recoveredCases:countryReports.recovered_diff,
                    activeCases:countryReports.activeCases,
                    confirmed_diff:countryReports.confirmed_diff,
                    deaths_diff:countryReports.deaths_diff,
                    recovered_diff:countryReports.recovered_diff,
                    fatality_rate: countryReports.fatality_rate,
                    countryName: countryReports.countryName,
                });

                //Check if report with the set date already exists
                Report.findOne({reportDate: reportDate,countryName:req.params.countryName}, function (error, foundReports){
                    if(foundReports){
                        // if(foundReports.countryName==country){
                        //     res.send('Record already exists')
                        // }else{
                        //     country.save(err=>{
                        //         if(!err){
                        //             res.send('Successfully added entry')
                        //         }else{
                        //             res.send(err);
                        //         }
                        //     });
                        //     }
                        res.send('Record already exists!')
                        // res.send(foundReports);
                        }else{
                        country.save(err=>{
                            if(!err){
                                res.send('Successfully added entry')
                            }else{
                                res.send(err);
                            }
                        });
                        // res.send('No found reports!');
                    }

                });

            });

        }).on('error', (e) => {
            console.error(e);
        });

    })
    .delete((req,res)=>{
        Report.deleteMany({countryName:req.params.countryName},err=>{
            if(!err){
                res.send('Successfully deleted all reports');
            }else{
                res.send(err);
            }
        })
    })

const saveCountryData=(country,res)=>{

}



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})