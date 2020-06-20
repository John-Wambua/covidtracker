// const cron=require('node-cron');
const schedule=require('node-schedule');
// y

const winston=require('winston');

// // Schedule DB to update at 11:00am every morning
// module.exports=()=>{
//     // cron.schedule('0 11 * * 0-7', () => {
//     //     update();
//     //     winston.info('Database updated!');
//     // },{
//     //     scheduled:true,
//     //     timezone:"Africa/Nairobi"
//     // });
//     const j=schedule.scheduleJob('*/5 * * * *',()=>{
//         winston.info('Database updated!');
//         console.log('Updated!')
//     })
// }
// update();
// winston.info('Database updated!');