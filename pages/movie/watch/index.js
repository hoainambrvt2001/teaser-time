import WatchMovie from '../../../src/watch';
import { getCredit, getDetail, getSimilar, getVideo } from '../../../api/movie';

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
    <WatchMovie
      movieDetail={movieDetail}
      movieActors={movieActors}
      movieVideos={movieVideos}
      movieSimilars={movieSimilars}
    />
  );
};

export default WatchMoviePage;
