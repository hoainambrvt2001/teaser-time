import { withRouter } from 'next/router';

import MovieDetail from '../../src/movie/components/MovieDetail';
import { getCredit, getDetail } from '../../api/movie';
import PageLayout from '../../components/PageLayout';

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
    <PageLayout>
      <MovieDetail
        movieDetail={movieDetail}
        movieCredit={movieCredit}
        movieId={movieId}
      />
    </PageLayout>
  );
};

export default withRouter(MoviePage);
