const mongoose = require('mongoose');


/// create movieSchema

const movieSchema = new mongoose.Schema({
     title : {
        type : String,
        reqiuired : true
     },
     rating : {
          type : Number,
          required : true
     },
     language : {
          type : String,
          required : true
     },
     release : {
          type : String,
          required : true
     }
})

/// Create a model

const movieModel =  mongoose.model("movies" , movieSchema);

module.exports = {
       movieModel
}