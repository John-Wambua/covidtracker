
exports.aliasTopConfirmed=(req,res,next)=>{
    req.query.limit='10';
    req.query.sort='-totalConfirmed';
    req.query.fields='country,totalConfirmed,date';
    // req.query.select='-id,-deathRate,-recoveryRate';
    next();
}