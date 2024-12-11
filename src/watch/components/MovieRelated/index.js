import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/outline';
import classes from './index.module.scss';
import { MOVIE_IMAGE_BASE_URL } from '../../../../config/index';

const MovieCard = ({ movieInfo }) => {
  return (
    <div className={classes.MovieCardWrapper}>
      <Image
        alt="Movie"
        src={`${MOVIE_IMAGE_BASE_URL}${
          movieInfo.poster_path || movieInfo.backdrop_path
        }`}
        width={720}
        height={1080}
        objectFit="contain"
      />
      <p>{movieInfo.title}</p>
    </div>
  );
};

const SlickNextArrow = ({ onClick }) => {
  return (
    <div className={classes.NextArrow} onClick={onClick}>
      <ArrowCircleRightIcon />
    </div>
  );
};

const SlickPrevArrow = ({ onClick }) => {
  return (
    <div className={classes.PrevArrow} onClick={onClick}>
      <ArrowCircleLeftIcon />
    </div>
  );
};

export default function MovieRalated({ movieSimilars }) {
  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.SectionWrapper}>
      <div className={classes.SectionTitle}>
        <h3>Maybe you are interested</h3>
      </div>
      <div className={classes.ListMovieWrapper}>
        <Slider {...settings}>
          {movieSimilars.results.map((relatedMovie, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: '/movie/watch',
                  query: {
                    m: relatedMovie.id,
                  },
                }}
              >
                <a style={{ cursor: 'pointer' }}>
                  <MovieCard key={index} movieInfo={relatedMovie} />
                </a>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
