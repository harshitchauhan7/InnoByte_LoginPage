class ApiFeature{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
  
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                //case insensitive
                $options:"i"

            },

        }:{};
        this.query = this.query.find({... keyword})
        return this;
    }

    //filter 

    filter(){
        const queryCopy = {...this.queryStr}

        //removing some fields for category

        const removeField = ["keyword","page","limit"]

        removeField.forEach((key)=> delete queryCopy[key])

        //filter for price and rating

        let querStr = JSON.stringify(queryCopy)

        querStr = querStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(querStr))

        
    }

    //pagination
    pagination(resultPerPage){

        const currentPage = this.queryStr.page || 1
        
        const skip = resultPerPage *(currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip)


        return this;
    }

}








module.exports= ApiFeature;