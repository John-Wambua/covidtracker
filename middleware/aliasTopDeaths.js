
exports.aliasTopDeaths=(req,res,next)=>{
    req.query.limit='10';
    req.query.sort='-totalDeaths';
    req.query.fields='country,totalDeaths,date';
    next();
}