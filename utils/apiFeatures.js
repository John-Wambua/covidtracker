const {Country}=require('../models/Country')
const ErrorHandler=require('../utils/errorHandler')
class ApiFeatures{
    constructor(query,queryString) {
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        const queryObj={...this.queryString};
        const exclude=['sort','fields','page','limit'];

        exclude.forEach(el=>{
            delete queryObj[el]
        });
        // console.log(queryObj,req.query);
        // { totalDeaths: { lt: '1000' } }

        /**1. FILTERING**/

        let queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        // console.log(JSON.parse(queryStr))
        // { totalConfirmed: { '$gt': '100000' } }

        this.query=Country.find(JSON.parse(queryStr));
        return this;
    }
    sort(){
        /**Sorting**/
        if (this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.query=this.query.sort(sortBy);
        }
        return this;
    }
    limitFields(){
        /**3. FIELD LIMITING**/
        if (this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            this.query=this.query.select(fields);
        }else{
            this.query=this.query.select('-__v -id');
        }
        return this;
    }
    paginate(){
        /**4. PAGINATION**/
        this.page=this.queryString.page*1||1;
        const limit=this.queryString.limit*1||100;
        //page=2&limit=10 page 1= 1-10, page 2=11-20
        const skip=(this.page-1)*limit;


        // Country.countDocuments({},(error,totalCountries)=>{
        //     if (error) return this.res.send(error)
        //     let totalPages=Math.ceil(totalCountries/limit);
        //
        //
        //    if (this.page>totalPages) return this.res.json({status: "fail",message:"Page exceeds limit"});
        //    //  if (this.page>totalPages)  return  console.log('Page exceeds limit');
        //
        // })
        this.query=this.query.skip(skip).limit(limit);
        return this;

    }
}

module.exports=ApiFeatures;