const { getMovie } = require('../services/service-helpers');

const doesMovieExist = (req, res, next) => {
  const movie = getMovie(req.params.id);
  if(!movie) return res.status(404).send({ message: 'movie does not exist' });
  next();
}

module.exports = {
  doesMovieExist
}