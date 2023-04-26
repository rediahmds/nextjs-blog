import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define directory of posts
const postsDirectory = path.join(process.cwd(), 'posts');

// Returns an array of object
export function getSortedPosts() {
  // 1. Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
  // 2. List the data on the index page, sorted by date.

  // Get all filenames
  const fileNames = fs.readdirSync(postsDirectory); // return arr of str ['a.md', 'b.md']

  // an array of object containing id, title
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from each file name to get id (filename used as id, without file extension)
    const id = fileName.replace(/\.md$/, '');

    // Read md content as str
    const fullPath = path.join(postsDirectory, fileName); // define file path for each post
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse md metadata with graymatter
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getPostsIDs() {
  const fileNames = fs.readdirSync(postsDirectory);

  // each file name is an id
  // so we must returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostByID(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
