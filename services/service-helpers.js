const axios = require("axios");
const Comment = require("../models/comments");

const api = process.env.API;

const getAllMovies = async () => {
	const { data } = await axios.get(`${api}`);
	return data.results;
};

const getMovie = async (id) => {
  const movies = await getAllMovies();
  const movie = movies.filter(movie => movie.episode_id == id);
  return movie[0];
}

const getCharacter = async (url) => {
	const  { data } = await axios.get(url);
	return data;
};

const getCommentCount = async (id) => {
	const comments = await Comment.findAll({ 
		where: {
			movieId: id
		} 
	});

	return comments.length;
};

const transformMovies = async (movies) => {
	const comments = [];
	movies.forEach((movie) => {
		comments.push(getCommentCount(movie.episode_id));
	});

	const commentCount = await Promise.allSettled(comments);

	const result = movies.map((movie, i) => {
		return {
			title: movie.title,
			opening_crawl: movie.opening_crawl,
			comment_count: commentCount[i].value,
		};
	});

	return result;
};

const transformCharacters = async (characters) => {
	const charcterPromise = characters.map((url) => getCharacter(url));
  const chars = await Promise.allSettled(charcterPromise);
  const result = chars.map((char) => char.value)
	return result;
};

module.exports = {
  getAllMovies,
  getMovie,
  transformMovies,
  transformCharacters
}