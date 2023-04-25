import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPosts } from '../lib/posts';

// Executed at build time in production
export async function getStaticProps() {
  const posts = getSortedPosts();

  // The value will be consumed by Home component
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm a self-taught developer, I have a passion for creating and
          developing new ideas. I have never stopped learning new skills and
          technologies. I have confidence in my abilities and I am always ready
          to face new challenges. I enjoy finding solutions to any project.
          Whether it's building a website or an app, I always strive to produce
          high-quality work. I am always open to feedback and collaboration and
          always looking for new opportunities to grow and improve as a software
          developer.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
