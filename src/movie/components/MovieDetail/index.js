import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

import { addBookmark } from '../../../../api/firebase.js';
import useAuth from '../../../../hooks/useAuth.js';
import { MOVIE_IMAGE_BASE_URL } from '../../../../config/index.js';

const LIMIT_SHOW_CAST = 3;

function MovieDetail({ movieDetail, movieCredit, movieId }) {
  const { user } = useAuth();
  const castList = (movieCredit?.cast || []).slice(0, LIMIT_SHOW_CAST);
  const company = movieDetail.production_companies[0];

  const handleClickAddBookmark = async () => {
    if (!user.userUid) return;
    const bookmarkData = {
      id: movieDetail.id,
      name: movieDetail.title,
      rating: movieDetail.vote_average,
      url: `${MOVIE_IMAGE_BASE_URL}${movieDetail.poster_path}`,
    };
    const isSuccessfullyAdded = await addBookmark(user?.userUid, bookmarkData);
    if (isSuccessfullyAdded) {
      alert('💌 Added to your favourite movies!');
    } else {
      alert('Failed to add bookmark, please try again!');
    }
  };

  return (
    <div className={styles.container}>
      <Image
        alt="Movie"
        layout="fill"
        className={styles.bgimg}
        src={
          `${MOVIE_IMAGE_BASE_URL}${
            movieDetail.backdrop_path || movieDetail.poster_path
          }` || `${MOVIE_IMAGE_BASE_URL}${movieDetail.poster_path}`
        }
        width={200}
        height={400}
      />
      <div className={styles.detail}>
        <div className={styles.poster}>
          <img
            alt="movie details is good"
            className={styles.img}
            src={
              `${MOVIE_IMAGE_BASE_URL}${movieDetail.poster_path}` ||
              `${MOVIE_IMAGE_BASE_URL}${
                movieDetail.backdrop_path || movieDetail.poster_path
              }`
            }
          />
          <Link
            href={{
              pathname: '/movie/watch',
              query: { m: movieId },
            }}
          >
            <a>
              <button className={styles.btn}>Watch movie</button>
            </a>
          </Link>
          {user ? (
            <button onClick={handleClickAddBookmark} className={styles.btn}>
              Bookmark this movie
            </button>
          ) : (
            <Link href="/login">
              <a>
                <button className={styles.btn}>Sign in to bookmark</button>
              </a>
            </Link>
          )}
        </div>
        <div className={styles.info}>
          <h1>{movieDetail.title}</h1>
          <h2>{movieDetail.original_title}</h2>
          <div className={styles.cate}>
            {(movieDetail?.genres || []).map((genre) => (
              <div key={genre.id} className={styles.tag}>
                <p className={styles.content}>{genre.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.origin}>
            <p className={styles.originName}>
              Director Company: <span>{company.name}</span>
            </p>
            <p className={styles.originName}>
              Origin: <span>{company.origin_country}</span>
            </p>
            <p className={styles.originName}>
              Release Date: <span>{movieDetail.release_date}</span>
            </p>
          </div>
          <div className={styles.descript}>{movieDetail.overview}</div>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Main actor</p>
            <div className={styles.list}>
              {castList.map((cast) => {
                return (
                  <div className={styles.content} key={cast?.name}>
                    <Image
                      layout="fixed"
                      className={styles.actorImg}
                      src={`${MOVIE_IMAGE_BASE_URL}${cast?.profile_path}`}
                      width={120}
                      height={120}
                      alt={`cast-image`}
                    />
                    <p className={styles.actorName}> {cast?.name}</p>
                    <p className={styles.subName}> {cast?.character} </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
