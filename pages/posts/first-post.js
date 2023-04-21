import React from 'react';
import Link from 'next/link';

export default function FirstPost() {
  return (
    <div>
      <h1>First Post</h1>
      <div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
