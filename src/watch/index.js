import MoviePlaying from './components/MoviePlaying';
import MovieDescription from './components/MovieDescription';
import MovieRalated from './components/MovieRelated';
import MovieActor from './components/MovieActor';
import PageLayout from '../../components/PageLayout';

const WathMovie = ({
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

export default WathMovie;
