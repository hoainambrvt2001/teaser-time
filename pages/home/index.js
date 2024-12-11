import { filter } from '../../api/movie';
import Home from '../../src/home';

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const country = context.query.country;
  const year = context.query.year;
  const sortType = context.query.sortType;

  let filterMovieData = await filter({ genre, country, year, sortType });

  if (!filterMovieData) {
    filterMovieData = [];
  }

  return {
    props: {
      filterMovieData,
    },
  };
}

const HomePage = ({ filterMovieData }) => {
  return <Home filterMovieData={filterMovieData} />;
};

export default HomePage;
