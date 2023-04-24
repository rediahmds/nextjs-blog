import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
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
    </Layout>
  );
}
