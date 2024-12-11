import Image from 'next/image';
import { ThumbUpIcon } from '@heroicons/react/outline';
import style from './index.module.scss';
import { MOVIE_IMAGE_BASE_URL } from '../../../../config/index';

const FilterMovieThumbnail = ({ filterMovie }) => {
  return (
    <div className={style.thumbnail}>
      <Image
        layout="responsive"
        src={
          `${MOVIE_IMAGE_BASE_URL}${
            filterMovie.backdrop_path || filterMovie.poster_path
          }` || `${MOVIE_IMAGE_BASE_URL}${filterMovie.poster_path}`
        }
        width={1920}
        height={1080}
        alt={'The best movie with very high score on Rottens Tomatoes'}
      />
      <div className={style.wrapper}>
        <p className={style.overview}>{filterMovie.overview} </p>
        <h2 className={style.title}>
          {filterMovie.title || filterMovie.original_name}
        </h2>
        <p className={style.vote}>
          {filterMovie.media_types && `${filterMovie.media_types} ●`}{' '}
          {filterMovie.release_date || filterMovie.first_air_date} ●{' '}
          <ThumbUpIcon className={style.thumbIcon} /> {filterMovie.vote_count}
        </p>
      </div>
    </div>
  );
};

export default FilterMovieThumbnail;
