import MoviePlaying from '../../../src/watch/components/MoviePlaying';
import MovieDescription from '../../../src/watch/components/MovieDescription';
import MovieRalated from '../../../src/watch/components/MovieRelated';
import MovieActor from '../../../src/watch/components/MovieActor';

import { getCredit, getDetail, getSimilar, getVideo } from '../../../api/movie';
import PageLayout from '../../../components/PageLayout';

export async function getServerSideProps(context) {
  const movieId = context.query.m;

  const [movieDetail, movieActors, movieVideos, movieSimilars] =
    await Promise.all([
      getDetail(movieId),
      getCredit(movieId),
      getVideo(movieId),
      getSimilar(movieId),
    ]);

  if (!movieDetail || !movieActors || !movieVideos || !movieSimilars) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movieDetail,
      movieActors,
      movieVideos,
      movieSimilars,
    },
  };
}

const WatchMoviePage = ({
  movieDetail,
  movieActors,
  movieVideos,
  movieSimilars,
}) => {
  return (
    <PageLayout>
      <MoviePlaying movieVideos={movieVideos} />
      <MovieDescription
        movieVideos={movieVideos}
        movieDetail={movieDetail}
        movieActors={movieActors}
      />
      <MovieRalated movieSimilars={movieSimilars} />
      <MovieActor movieActors={movieActors} />
    </PageLayout>
  );
};

export default WatchMoviePage;
