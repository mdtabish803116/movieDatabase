const mongoose = require('mongoose');


async function connectDatabase(){
      let dbUri = 'mongodb://127.0.0.1:27017/movieData';
      try{
          const res = await mongoose.connect(dbUri);
            console.log("Connection hase made to database");
      }catch(err){
           console.log(err);
          console.log("Connection has not been made to database")
      }
}

module.exports = {
      connectDatabase
}