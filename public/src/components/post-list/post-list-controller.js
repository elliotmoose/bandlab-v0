class PostListController {
  /**
   * @type {PostListView}
   */
  view;

  /**
   * @param {PostListView} view
   */
  constructor(view) {
    this.view = view;
  }

  onViewMounted() {
    this.loadPosts();
  }

  async loadPosts() {
    this.view.renderLoading();
    const posts = await PostService.getPosts();
    this.view.renderPosts(posts);

    this.view.setAttribute("sorted", `${this.state.sorted}`);
    this.view.setAttribute("grouped", `${this.state.grouped}`);
  }

  state = {
    sorted: false,
    grouped: false,
    posts: null,
    isLoading: false,
  };

  toggleSorted() {
    this.state.sorted = !this.state.sorted;
    this.view.setAttribute("sorted", `${this.state.sorted}`);
  }

  toggleGrouped() {
    this.state.grouped = !this.state.grouped;
    this.view.setAttribute("grouped", `${this.state.grouped}`);
  }
}
