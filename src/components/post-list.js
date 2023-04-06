class PostListComponent extends HTMLElement {
  /**
   * @type {Post[]}
   */
  posts = [];

  /**
   * @type {HTMLDivElement}
   */
  _container;

  async loadPosts() {
    const posts = await PostController.loadPosts();
    this.posts = posts ?? [];
    return posts;
  }

  constructor() {
    super();
  }

  /**
   * Tell DOM to rerender posts
   * @param {Post[] | undefined} posts
   */
  updateRender(posts) {
    this.container.innerHTML = "";

    if (posts === undefined) {
      const error = document.createElement("span");
      error.textContent = "Error loading posts";
      this.container.appendChild(error);
    }

    this.posts.forEach((post) => {
      const postComponent = document.createElement("post-item");
      postComponent.post = post;
      this.container.appendChild(postComponent);
    });
  }

  connectedCallback() {
    this.container = document.createElement("ol");
    this.container.setAttribute("class", "post-list-container");
    this.loadPosts().then(this.updateRender.bind(this));
    this.appendChild(this.container);
  }
}

customElements.define("post-list", PostListComponent);
