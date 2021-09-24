const express = require('express');
const { 
  getMovies, 
  getCommentsByMovie, 
  makeCommentsByMovie, 
  getCharactersByMovie 
} = require("../controllers/movie-controller");
const { getIp } = require("../middleware/get-Ip");
const validate = require("../middleware/validate");
const { doesMovieExist } = require('../middleware/movie-exists');
const movieValidator = require("../middleware/comments-by-movie-validator");
const { mcValidator } = require("../middleware/make-comment-validator");
const { paramValidator, queryValidator } = require('../middleware/characters-by-movie-validator');

const router = express.Router();

router.get("/api/movies", getMovies)

router.get(
  "/api/movies/comments/:movieId", 
  movieValidator,
  validate,
  doesMovieExist,
  getCommentsByMovie
);

router.post(
  "/api/movies/comments", 
  getIp, 
  mcValidator,
  validate,
  makeCommentsByMovie
);

router.get(
  "/api/movies/characters/:movieId",
  paramValidator,
  queryValidator,
  validate,
  doesMovieExist,
  getCharactersByMovie
)

module.exports = router