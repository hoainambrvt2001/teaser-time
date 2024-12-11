import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import st from './index.module.scss';
import useAuth from '../../../../hooks/useAuth.js';
import { getBookmarks } from '../../../../api/firebase.js';

function UserProfile() {
  const { user } = useAuth();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getUserBookmark = async () => {
      const bookmarks = await getBookmarks(user.userUid);
      setMovies(bookmarks);
    };
    if (user?.userUid) {
      getUserBookmark();
    }
  }, [user]);

  return (
    <div>
      <div className={st.SectionWrapper}>
        <h1 className={st.h1}> Welcome {user?.userName} </h1>
        <p className={st.p}> {user?.userEmail} </p>
        <Image
          alt="Welcome"
          layout="fixed"
          className={st.bgimg}
          src={user?.userPhotoUrl || '/avatar.jpg'}
          width={100}
          height={100}
        />
      </div>

      <h1 className={st.title}>Your PlayList</h1>
      <div className={st.playList}>
        {movies?.Movie?.map((mov, index) => (
          <div className={st.container} key={index}>
            <Link
              href={{
                pathname: '/movie/watch',
                query: { m: mov.id },
              }}
            >
              <a>
                <Image
                  alt="Movie"
                  layout="responsive"
                  className={st.img}
                  src={mov?.url}
                  width={60}
                  height={40}
                />
              </a>
            </Link>
            <div className={st.content}>
              <h2 className={st.maincontent}>{mov.name} </h2>
              <h3 className={st.subcontent}>Rating: {mov.rating}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
