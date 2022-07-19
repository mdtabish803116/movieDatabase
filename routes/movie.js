const express = require('express');
const {fetchAllMovie} = require("../handlers/movie");

const movieRouter = express.Router();

movieRouter.get("/movies" ,fetchAllMovie )


module.exports = {
     movieRouter
}