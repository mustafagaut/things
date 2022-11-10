class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;

    }
    search(){
        const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
      this.query=this.query.find({...keyword});
      return this;
        

    }

    filter(){
        const querycopy={...this.queryStr};

        

        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete querycopy[key]);
       
        //filter for price 
        
        let querystr=JSON.stringify(querycopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,key =>`$${key}`);
        
        this.query=this.query.find(JSON.parse(querystr));
        return this;


    }
    pagination(resultPerpage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip = resultPerpage*(currentPage-1);
        this.query=this.query.limit(resultPerpage).skip(skip);
        return this;
      }


      
};


module.exports=ApiFeatures;