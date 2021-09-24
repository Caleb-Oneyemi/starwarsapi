const { calculateCm, calculateFeetAndInches } = require("../utils/calculateHeight");
const {
  getAllMovies,
  getMovie,
  transformMovies,
  transformCharacters
} = require('./service-helpers');

const getMoviesService = async () => {
	const movies = await getAllMovies();
	const result = await transformMovies(movies);
	return result;
};

const getCharactersService = async (id, sortBy = 'name', filter = '', order = 'Asc') => {
	const movie = await getMovie(id);
	const data = await transformCharacters(movie.characters);
  let result;
  
  if(sortBy === 'height') {
    result = data.sort((a, b) => {
      return order === 'Asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    })
  } else {
    result = data.sort((a,b) => {
      if (a[sortBy] < b[sortBy]) return order === 'Asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === 'Asc' ? 1 : -1;
      return 0;
    });
  }

  if(filter) result = result.filter(res => res.gender === filter);
  const totalHeightCm = calculateCm(result);
  return {
    metadata: {
      total: result.length,
      totalHeightCm,
      totalHeightFeetAndInches: calculateFeetAndInches(totalHeightCm)
    },
    result
  };
};


module.exports = {
	getMoviesService,
	getCharactersService,
};
