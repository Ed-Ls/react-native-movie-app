import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'YOUR_API_KEY';

//Get Popular Movies from API
export const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);

  return response.data.results;
};

//Get Upcoming Movies from API
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}&page=1`);

  return response.data.results;
};

//Get Popular TV Series from API
export const getPopularTV = async () => {
  const response = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);

  return response.data.results;
};

//Get Family Movies from API
export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );

  return response.data.results;
};

//Get Fantasy Movies from API
export const getFantasyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=14`,
  );

  return response.data.results;
};

//Get Thiller Movies from API
export const getThrillerMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=53`,
  );

  return response.data.results;
};

//Get Movie Detail (Detail Screen)
export const getMovie = async id => {
  const response = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);

  return response.data;
};

//Get Movie Video (Detail Screen)
export const getMovieVideo = async id => {
  const response = await axios.get(
    `${apiUrl}/movie/${id}/videos?${apiKey}&official=true&language=en-US&site=Youtube`,
  );

  return response.data;
};

//Search for movie or tv by keyword
export const searchMovieOrTv = async (query, type) => {
  const response = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );

  return response.data.results;
};

//Get random movie
export const getRandomMovie = async () => {
  const response = await axios.get(`${apiUrl}/discover/movie?${apiKey}&page=5`);

  return response.data.results;
};
