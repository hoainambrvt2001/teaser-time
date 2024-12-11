import SearchBar from './components/SearchBar';
import PageLayout from '../../components/PageLayout';

const Search = ({ results }) => {
  return (
    <PageLayout>
      <SearchBar results={results} />
    </PageLayout>
  );
};

export default Search;
