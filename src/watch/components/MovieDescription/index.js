import Image from 'next/image';
import Link from 'next/link';
import classes from './index.module.scss';

import FavoriteIcon from '../../../../public/favorite_icon.svg';
import ShareIcon from '../../../../public/share_icon.svg';
import {
  MOVIE_IMAGE_BASE_URL,
  SHARE_FACEBOOK_BASE_URL,
} from '../../../../config/index';
import useAuth from '../../../../hooks/useAuth';
import { addBookmark } from '../../../../api/firebase';

export default function MovieDescription({
  movieVideos,
  movieDetail,
  movieActors,
}) {
  const { user } = useAuth();
  // Get movie trailer
  let trailerUrl;
  for (let i = 0; i < movieVideos.results.length; i++) {
    if (movieVideos.results[i].type === 'Trailer') {
      trailerUrl = movieVideos.results[i].key;
    }
  }

  // Get director:
  let director;
  for (let i = 0; i < movieActors.crew.length; i++) {
    if (movieActors.crew[i].job === 'Director') {
      director = movieActors.crew[i];
      break;
    }
  }

  // Get 10 actors:
  let actors = '';
  let numberActors = 0;
  for (let i = 0; i < movieActors.cast.length; i++) {
    if (numberActors > 10) break;
    actors += `${movieActors.cast[i].name}, `;
    numberActors++;
  }
  actors += '. . .';

  // Get genres:
  let genres = '';
  movieDetail.genres.forEach((genre) => {
    genres += `${genre.name}, `;
  });

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
    <div className={classes.SectionContainer}>
      <div className={classes.LeftIntro}>
        <div className={classes.Col1}>
          <Image
            alt="Movie"
            src={`${MOVIE_IMAGE_BASE_URL}${
              movieDetail.poster_path || movieDetail.backdrop_path
            }`}
            width={720}
            height={1080}
            objectFit="contain"
          />
        </div>
        <div className={classes.Col2}>
          <div className={classes.FilmTitle}>
            <h4>{movieDetail.title}</h4>
            <h5>{movieDetail.original_title}</h5>
          </div>
          <div className={classes.UserAction}>
            <ul className={classes.ListInline}>
              <li className={classes.FollowBtn}>
                <a onClick={handleClickAddBookmark}>
                  <span>
                    <Image alt="Bookmark" src={FavoriteIcon} width={20} />
                  </span>
                  <p>Follow</p>
                </a>
              </li>
              <li className={classes.ShareBtn}>
                <Link href={`${SHARE_FACEBOOK_BASE_URL}/${trailerUrl}`}>
                  <a>
                    <span>
                      <Image alt="Share" src={ShareIcon} />
                    </span>
                    <p>Share</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={classes.FilmDesc}>
            <span>Overview</span>
            <p>
              {movieDetail.overview}
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className={classes.RightIntro}>
        <div className={classes.TableDescription}>
          <table>
            <tbody>
              <tr>
                <td>Time</td>
                <td>{movieDetail.runtime} minutes</td>
              </tr>
              <tr>
                <td>Director</td>
                <td>{director.name}</td>
              </tr>
              <tr>
                <td>Cast</td>
                <td>{actors}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>{movieDetail.original_language.toUpperCase()}</td>
              </tr>
              <tr>
                <td>Genres</td>
                <td>{genres}</td>
              </tr>
              <tr>
                <td>Release Date</td>
                <td>{movieDetail.release_date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
