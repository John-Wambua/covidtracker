const cron=require('node-cron');
const update=require('../startup/updateDB');
const winston=require('winston');

// Schedule DB to update at 11:00am every morning
module.exports=()=>{
    cron.schedule('0 11 * * 0-7', () => {
        update();
        winston.info('Database updated!');
    },{
        scheduled:true,
        timezone:"Africa/Nairobi"
    });
}