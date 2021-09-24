const { getMoviesService, getCharactersService } = require("../services/movie-service");
const Comment = require("../models/comments");

const getMovies = async (req, res) => {
  try {
    const movies = await getMoviesService();
    
    res.status(200).send(movies);
  } catch(err) {
    res.status(400).send(err.message)
  }
};

const getCommentsByMovie = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        movieId: req.params.movieId
      } 
    });
    comments.reverse();
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}

const makeCommentsByMovie = async (req, res) => {
  try {
    await Comment.create(req.body);
    res.status(201).send({
      message: 'Comment created successfully',
    });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
}

const getCharactersByMovie = async (req, res) => {
  const { movieId } = req.params;
  const { order, sortBy, filter } = req.query;

  try {
    const characters = await getCharactersService(movieId, sortBy, filter, order);
    res.status(200).send(characters);
  } catch(err) {
    res.status(400).send(err.message)
  }
}

module.exports = {
  getMovies,
  getCommentsByMovie,
  makeCommentsByMovie,
  getCharactersByMovie
}