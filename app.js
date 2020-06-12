const express=require('express');
const winston=require('winston')
const app=express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/schedule')()


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
    winston.info(`Server is running on port ${port}`);
})
