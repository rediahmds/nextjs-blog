import React from 'react';
import Layout from '../../components/Layout';
import DateTime from '../../components/DateTime';
import Head from 'next/head';
import { getPostsIDs, getPostByID } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = getPostByID(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getPostsIDs();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateTime dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
