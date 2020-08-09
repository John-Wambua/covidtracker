
exports.aliasTopRecovered=(req,res,next)=>{
    req.query.limit='10';
    req.query.sort='-totalRecovered';
    req.query.fields='country,totalConfirmed,totalRecovered,totalDeaths,date';
    next();
}