class PostListView extends HTMLElement {
  static get observedAttributes() {
    return ["sorted", "grouped"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.renderPosts(this.posts, this.sorted, this.grouped);
  }

  get sorted() {
    return this.getAttribute("sorted") === "true";
  }

  get grouped() {
    return this.getAttribute("grouped") === "true";
  }

  /**
   * @type {Post[]}
   */
  posts = [];

  /**
   * @type {HTMLDivElement}
   */
  _container;

  /**
   * @type {PostListController}
   */
  controller;

  constructor() {
    super();
    this.controller = new PostListController(this);
  }

  renderClear() {
    this.container.innerHTML = "";
  }

  _renderActionBar() {
    const actionBar = document.createElement("div");
    actionBar.setAttribute("class", "action-bar");
    this.container.appendChild(actionBar);

    const refreshButton = document.createElement("button");
    refreshButton.setAttribute("id", "refresh_button");
    refreshButton.textContent = "Refresh Posts";
    refreshButton.addEventListener("click", () => {
      this.controller.loadPosts();
    });
    actionBar.appendChild(refreshButton);

    const groupedButton = document.createElement("button");
    groupedButton.setAttribute("id", "grouped_button");
    groupedButton.textContent = `Grouped: ${this.grouped}`;
    groupedButton.addEventListener("click", () => {
      this.controller.toggleGrouped();
    });
    actionBar.appendChild(groupedButton);

    const sortedButton = document.createElement("button");
    sortedButton.setAttribute("id", "sorted_button");
    sortedButton.textContent = `Sorted: ${this.sorted}`;
    sortedButton.addEventListener("click", () => {
      this.controller.toggleSorted();
    });
    actionBar.appendChild(sortedButton);
  }

  /**
   * Tell DOM to render posts
   * @param {Post[] | null} posts
   */
  renderPosts(posts) {
    this.renderClear(); // have space for future optimisation. see README.md
    this._renderActionBar();

    this.posts = posts;
    const isError = posts === null;
    if (isError) {
      const error = document.createElement("span");
      error.textContent = "Error loading posts";
      this.container.appendChild(error);
      return;
    }

    let finalPosts = posts;
    if (this.sorted) {
      finalPosts = postsSortedByTitle(finalPosts);
    }

    finalPosts.forEach((post) => {
      const postComponent = document.createElement("post-item");
      postComponent.post = post;
      this.container.appendChild(postComponent);
    });
  }

  renderLoading() {
    this.renderClear(); // have space for future optimisation. see README.md
    this._renderActionBar();
    this.container.innerHTML = "loading...";
  }

  connectedCallback() {
    this.container = document.createElement("ol");
    this.container.setAttribute("class", "post-list-container");
    this.appendChild(this.container);

    this.controller.onViewMounted();
  }
}

customElements.define("post-list", PostListView);
