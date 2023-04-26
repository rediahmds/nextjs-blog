import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define directory of posts
const postsDirectory = path.join(process.cwd(), 'posts');

// Returns an array of object
export function getSortedPosts() {
  // 1. Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
  // 2. List the data on the index page, sorted by date.

  // Get all filenames
  const fileNames = fs.readdirSync(postsDirectory); // return arr of str ['a.md', 'b.md']
  // Remove the README.md file
  fileNames.splice(1, 1); // not the best way to do this, i know

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
  fileNames.splice(1, 1);

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

export function getPostByID(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
