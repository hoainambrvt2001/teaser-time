import FilterMovie from './components/FilterMovie';
import FilterBar from './components/FilterBar';
import PageLayout from '../../components/PageLayout';

const Home = ({ filterMovieData }) => {
  return (
    <PageLayout>
      <FilterBar />
      <FilterMovie filterMovieData={filterMovieData.results} />
    </PageLayout>
  );
};

export default Home;
