import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function FirstPost() {
  return (
    <div>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
