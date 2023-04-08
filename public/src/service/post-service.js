const PostService = {
  /**
   * Loads posts from api
   * @returns {Promise<Array<Post>>}
   */
  getPosts: async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = await response.json();
      return posts;
    } catch (error) {
      return null;
    }
  },
};
