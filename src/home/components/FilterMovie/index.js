import Link from 'next/link';
import style from './index.module.scss';
import FilterMovieThumbnail from '../FilterMovieThumbnail';

const FilterMovie = ({ filterMovieData }) => {
  return (
    <div className={style.wrapper}>
      {filterMovieData?.map((filterMovie) => (
        <Link
          key={filterMovie.id}
          href={{
            pathname: '/movie',
            query: { m: JSON.stringify(filterMovie.id) },
          }}
        >
          <a>
            <FilterMovieThumbnail
              key={filterMovie.id}
              filterMovie={filterMovie}
            />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default FilterMovie;
