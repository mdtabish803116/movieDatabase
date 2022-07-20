const { captureRejectionSymbol } = require("events");
const {movieModel} = require("../database/movie");

async function fetchAllMovie(req , res , next){
     let {filterByTitle , filterByRating , searchByTitle , sortBy , page , limit} = req.query;
     page = parseInt(page)-1||0;
     limit = parseInt(limit)||5;

     // console.log( filterByTitle.split(","))
     // console.log(filterByRating.split(","))


     /// filterByRating  

     if(filterByRating){
          filterByRating =  {rating : {$in : filterByRating.split(",").map(Number)}}
          console.log(filterByRating);
     }else {
            filterByRating = {}
     }

     ///filterByTitle

       if(filterByTitle){
           filterByTitle =  {title : {$in : filterByTitle.split(",")}}
       }else {
           filterByTitle = {}
       }


       //search query here


       if(searchByTitle){
          searchByTitle = {title : {$regex : searchByTitle , $options : "i"}}
       }else {
            searchByTitle = {}
       }


     /// sortings by

       let sorting = {} // key-valuepair required thatswhy put it in a object 
     if(sortBy){
          sortBy = sortBy.split(",");
          if(sortBy[1]){
               if(sortBy[1] === "asc"){
                     sorting[sortBy[0]] = 1
               }else if(sortBy[1] === "dsc"){
                      sorting[sortBy[0]] = -1
               }else {
                    return res.status(404).send({
                          error : "Invalid sort"
                    })
               }
               
          }else {
                sorting[sortBy[0]] = 1;
          }
     }else {
          sorting = {}
     }
       try{  

          let movies = await movieModel.find({$and : [filterByRating , filterByTitle , searchByTitle]})
          .sort(sorting)
          .skip(page*limit)
          .limit(limit);

          const total =  await movieModel.find({$and : [filterByRating , filterByTitle , searchByTitle]}).count()

          console.log(movies);
           return res.status(200).send({
               message : "succesful",
               total,
               page : page + 1,
               limit,
               movies
           })

       }catch(err){
            console.log("something went wrong",err);
            return res.status(404).send({
                 error : "Something went wrong"
            })
       }

   
}


module.exports ={
     fetchAllMovie,

}