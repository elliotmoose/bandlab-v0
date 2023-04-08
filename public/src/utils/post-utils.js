/**
 *
 * @param {Post[]} posts
 */
function postsSortedByTitle(posts) {
  return [...posts].sort((a, b) => (a.title > b.title ? 1 : -1));
}

/**
 *
 * @param {Post[]} posts
 * @returns {{[userId: number]: Post[]}}}
 */
function postsGroupedByUserId(posts) {
  return posts.reduce((acc, post) => {
    if (!acc[post.userId]) {
      acc[post.userId] = [];
    }
    acc[post.userId].push(post);
    return acc;
  }, {});
}
