const {Country}=require('../models/Country')

exports.allCountries=(req,res,next)=>{

    const queryObj={...req.query};
    const exclude=['sort','fields','page','limit'];

    exclude.forEach(el=>{
        delete queryObj[el]
    });
    // console.log(queryObj,req.query);
    // { totalDeaths: { lt: '1000' } }

    //1. FILTERING

    let queryStr=JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    // console.log(JSON.parse(queryStr))
    // { totalConfirmed: { '$gt': '100000' } }

    let query=Country.find(JSON.parse(queryStr));

    //2. Sorting
    if (req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ')
        query=query.sort(sortBy);
    }

    /**3. FIELD LIMITING**/
    if (req.query.fields){
        const fields=req.query.fields.split(',').join(' ');
        query=query.select(fields);
    }else{
        query=query.select('-__v');
    }

    //4. PAGINATION
    let page=req.query.page*1||1;
    const limit=req.query.limit*1||100;
    //page=2&limit=10 page 1= 1-10, page 2=11-20
    const skip=(page-1)*limit;
    let totalPages;

    Country.countDocuments({},(error,totalCountries)=>{
        if (error) return next(error)
        totalPages=Math.ceil(totalCountries/limit);


        if (req.query.page) if (page>totalPages)  return  next(new Error('Page exceeds limit'));

        query=query.skip(skip).limit(limit);

        query.exec( (err, countries)=> {

            if (err) return next(err);
            if(!countries) return res.status(404).json({status: "failed",message:"No country found"});

            res.status(200).json({
                status:"success",
                page:page,
                results:countries.length,
                data:{
                    countries
                }
            })

        });
    })
}