import Movie from '../../src/movie';
import { getCredit, getDetail } from '../../api/movie';

export async function getServerSideProps(context) {
  const movieId = context.query.m;

  const [movieDetail, movieCredit] = await Promise.all([
    getDetail(movieId),
    getCredit(movieId),
  ]);

  if (!movieDetail || !movieCredit) {
    return {
      notFound: true,
    };
  }

  return {
    props: { movieDetail, movieCredit, movieId },
  };
}

const MoviePage = ({ movieDetail, movieCredit, movieId }) => {
  return (
    <Movie
      movieDetail={movieDetail}
      movieCredit={movieCredit}
      movieId={movieId}
    />
  );
};

export default MoviePage;
