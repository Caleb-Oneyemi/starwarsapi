const calculateCm = (movies) => {
  return movies.reduce((total, movie) => total + parseInt(movie?.height), 0)
}

const calculateFeetAndInches = (num) => {
  const feet = ((num * 0.393700) / 12);
  const ft = Math.floor(feet);
  const inches = Math.round((feet - ft) * 12);
  return `${ft}/${inches}`
}

module.exports = {
  calculateCm,
  calculateFeetAndInches
}