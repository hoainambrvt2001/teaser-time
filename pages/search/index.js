import { getDetail, search } from '../../api/movie';
import Search from '../../src/search';

export async function getServerSideProps(context) {
  const searchStr = context.query.s;
  let results = [];
  try {
    if (searchStr) {
      const searchedRes = await search(searchStr);
      const searchedMovies = searchedRes?.results || [];
      for (const movie of searchedMovies) {
        try {
          const res = await getDetail(movie.id);
          if (res?.id) {
            results.push(res);
          }
        } catch (err) {
          console.error('Error fetching movie details:', err);
        }
      }
    }
  } catch (err) {
    console.error('Error fetching movie data:', err);
    results = [];
  }

  return {
    props: {
      results,
    },
  };
}

const SearchPage = ({ results }) => {
  return <Search results={results} />;
};

export default SearchPage;
