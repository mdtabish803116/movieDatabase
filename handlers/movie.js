const {movieModel} = require("../database/movie");

async function fetchAllMovie(req , res , next){
     let filter = req.query.filter||"All";

     console.log(filter.split(","));

       let movies = {};

     

         return res.send({
             data : movies
         })
}


module.exports ={
     fetchAllMovie,

}