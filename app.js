const express=require('express');
const mongoose=require('mongoose');

const port=3000;

const app=express();

app.use(express.static('public'))

mongoose.connect('mongodb://localhost/covidtrackerDB',{useNewUrlParser: true,useUnifiedTopology:true});

app.get('/',(req,res)=>{
    res.send('<h1>Hello!</h1>');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})