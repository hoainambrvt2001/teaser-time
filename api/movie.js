import dateFormat from 'dateformat';
import { MOVIE_BASE_URL, MOVIE_API_KEY, MOVIE_API_LANGUAGE } from '../config';

export async function search(searchStr) {
  const response = await fetch(
    `${MOVIE_BASE_URL}/search/movie?api_key=${MOVIE_API_KEY}&language=${MOVIE_API_LANGUAGE}&query=${searchStr}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
  return response;
}

export async function filter(queryParams) {
  const { genre = '', country = '', year = '', sortType = '' } = queryParams;
  const releaseDate = dateFormat(new Date(), 'yyyy-mm-dd');
  const queryGenre = genre && `&with_genres=${genre}`;
  const queryCountry = country && `&with_original_language=${country}`;
  const queryYear = year && `&year=${year}`;
  const querySortBy = sortType && `&sort_by=${sortType}`;
  const queryReleaseDate = `&release_date.lte=${releaseDate}`;
  const result = await fetch(
    `${MOVIE_BASE_URL}/discover/movie?api_key=${MOVIE_API_KEY}${queryGenre}${querySortBy}${queryYear}${queryCountry}${queryReleaseDate}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
  return result;
}

export async function getDetail(movieId) {
  const response = await fetch(
    `${MOVIE_BASE_URL}/movie/${movieId}?api_key=${MOVIE_API_KEY}&language=${MOVIE_API_LANGUAGE}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
  return response;
}

export async function getCredit(movieId) {
  const response = await fetch(
    `${MOVIE_BASE_URL}/movie/${movieId}/credits?api_key=${MOVIE_API_KEY}&language=${MOVIE_API_LANGUAGE}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
  return response;
}

export async function getVideo(movieId) {
  const response = await fetch(
    `${MOVIE_BASE_URL}/movie/${movieId}/videos?api_key=${MOVIE_API_KEY}&language=${MOVIE_API_LANGUAGE}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
  return response;
}

export async function getSimilar(movieId) {
  const response = await fetch(
    `${MOVIE_BASE_URL}/movie/${movieId}/similar?api_key=${MOVIE_API_KEY}&language=${MOVIE_API_LANGUAGE}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
  return response;
}
