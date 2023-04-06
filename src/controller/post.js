const PostController = {
  async loadPosts() {
    const posts = await PostService.getPosts();
  },
};
