import Head from 'next/head';

import classes from './index.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PageLayout = ({ isHiddenNav = false, children }) => {
  return (
    <>
      <Head>
        <title>Teaser Time</title>
        <meta
          name="description"
          content="Welcome to the Teaser Time - an storage of many interesting movies with all genres from around the world. This will bring you to an amazing experience movie watching"
        />
        <link
          rel="icon"
          href="/teaser-time-logo.png"
          sizes="8x16"
          type="image/png"
        />
      </Head>
      <div className={classes.layout}>
        <Header isHiddenNav={isHiddenNav} />
        <div className={classes.contentWrapper}>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
