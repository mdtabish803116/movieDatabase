const express = require('express');
const cors = require('cors');
const {connectDatabase} = require("./database/index");
const {movieRouter} = require("./routes/movie");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(movieRouter);

function logger(req , res , next) {
      console.info(new Date() , req.method , req.path);
      next();
}

connectDatabase().then(() => {
    app.listen(8001 , () => {
        console.log("server running at http://localhost:8001")
  })

})
