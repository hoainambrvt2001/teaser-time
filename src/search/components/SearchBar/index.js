import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { toSlug } from '../../../../utils/strings';
import { MOVIE_IMAGE_BASE_URL } from '../../../../config/index';

const SearchBar = ({ results }) => {
  const [inpSearch, setInpSearch] = useState('');
  const router = useRouter();

  const handleSearchMovie = () => {
    router.replace(`/search?s=${toSlug(inpSearch)}`);
  };

  return (
    <div className={styles.SearchWrapper}>
      <div className={styles.Container}>
        <div className={styles.SearchInputContainer}>
          <input
            type="text"
            className={styles.SearchBar}
            placeholder="Enter your movie..."
            value={inpSearch}
            onChange={(e) => {
              setInpSearch(e.target.value);
            }}
          />
          <button
            className={styles.SubmitSearchButton}
            onClick={handleSearchMovie}
          >
            Search
          </button>
        </div>
        <br />
        <br />
        <div className={styles.CardWrapper}>
          {results.map((result) => {
            return (
              <Link
                key={result?.id}
                passHref
                href={{
                  pathname: '/movie',
                  query: { m: JSON.stringify(result?.id) },
                }}
              >
                <div className={styles.Card}>
                  <div className={styles.Image}>
                    <Image
                      alt="movie thumbnail"
                      src={
                        result?.poster_path
                          ? `${MOVIE_IMAGE_BASE_URL}${result.poster_path}`
                          : '/movie-default-thumbnail.jpg'
                      }
                      width={216}
                      height={324}
                    />
                  </div>
                  <div className={styles.CardBody}>
                    <h3 className={styles.name}>
                      {result.title || result.original_title}
                    </h3>
                    <h3 className={styles.desc}>
                      {result.overview || result.title || result.original_title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
