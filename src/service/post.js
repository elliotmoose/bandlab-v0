const PostService = {
  /**
   * Loads posts from api
   * @typedef {{id: number; body: string; title: string; userId: number}} Post
   * @returns {Promise<Array<Post>>}
   */
  getPosts: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    return posts;
  },
};
