import Link from 'next/link';
import Image from 'next/image.js';

import styled from './index.module.scss';
import useAuth from '../../hooks/useAuth.js';

function Header({ isHiddenNav = false }) {
  const { user, signOutWithFirebase } = useAuth();

  return (
    <>
      <nav className={styled.headerSmallscreen}>
        <div className={styled.burger}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </div>
        <div className={styled.headerBrand}>
          <Link
            href={{
              pathname: '/home',
              query: { sortType: 'popularity.desc' },
            }}
            replace
          >
            <a className={styled.brand}>
              <Image
                src="/teaser-time-logo.png"
                alt="logo-image"
                height={35}
                width={70}
              />
            </a>
          </Link>
        </div>
        {!isHiddenNav && (
          <div className={styled.headerWrap}>
            <div className={styled.headerTitle}>
              <Link href="/search">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Search</span>
                </a>
              </Link>
            </div>
          </div>
        )}
      </nav>
      <nav className={styled.header}>
        <div className={styled.headerBrand}>
          <Link href="/home" replace>
            <a className={styled.brand}>
              <Image
                src="/teaser-time-logo.png"
                alt="logo-image"
                height={35}
                width={70}
              />
            </a>
          </Link>
        </div>
        {!isHiddenNav && (
          <div className={styled.headerWrap}>
            <div className={styled.wrapStart}>
              <div className={styled.headerTitle}>
                <Link href="/search">
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span>Search</span>
                  </a>
                </Link>
              </div>

              <div className={styled.headerTitle}>
                <Link href="/home?sortType=popularity.desc">
                  <a>
                    <span>Popular</span>
                  </a>
                </Link>
              </div>

              <div className={styled.headerTitle}>
                <Link href="/home?sortType=vote_average.desc">
                  <a>
                    <span>Top Rated</span>
                  </a>
                </Link>
              </div>
            </div>

            <div className={styled.wrapEnd}>
              {
                <div className={styled.username}>
                  <Link href="/user">
                    <a>{user?.userName}</a>
                  </Link>
                </div>
              }
              <div className={styled.endButton}>
                {!user && (
                  <Link href="/login">
                    <a className={styled.signButton}>Sign in</a>
                  </Link>
                )}
                {user && (
                  <button
                    className={styled.signButton}
                    onClick={signOutWithFirebase}
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
