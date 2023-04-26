import React from 'react';
import Layout from '../../components/Layout';
import { getPostsIDs, getPostByID } from '../../lib/posts';

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
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
