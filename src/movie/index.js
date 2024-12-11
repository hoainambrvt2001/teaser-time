import MovieDetail from './components/MovieDetail';
import PageLayout from '../../components/PageLayout';

const Movie = ({ movieDetail, movieCredit, movieId }) => {
  return (
    <PageLayout>
      <MovieDetail
        movieDetail={movieDetail}
        movieCredit={movieCredit}
        movieId={movieId}
      />
    </PageLayout>
  );
};

export default Movie;
