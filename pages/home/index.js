import FilterMovie from '../../src/home/components/FilterMovie';
import FilterBar from '../../src/home/components/FilterBar';
import { filter } from '../../api/movie';
import PageLayout from '../../components/PageLayout';

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
  return (
    <>
      <PageLayout>
        <FilterBar />
        <FilterMovie filterMovieData={filterMovieData.results} />
      </PageLayout>
    </>
  );
};

export default HomePage;
