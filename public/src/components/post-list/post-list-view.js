class PostListView extends HTMLElement {
  static get observedAttributes() {
    return ["sorted", "grouped"];
  }

  /**
   * Trigger rerender when attributes change
   */
  attributeChangedCallback(name, oldValue, newValue) {
    this.renderPosts(this.posts);
  }

  get sorted() {
    return this.getAttribute("sorted") === "true";
  }

  get grouped() {
    return this.getAttribute("grouped") === "true";
  }

  /**
   * @type {Post[] | null}
   */
  posts = [];

  /**
   * @type {HTMLOListElement}
   */
  container;

  /**
   * @type {PostListController}
   */
  controller;

  constructor() {
    super();
    // attach controller
    this.controller = new PostListController(this);
  }

  /**
   * Render refresh, grouped, and sort buttons
   */
  _renderActionBar() {
    const actionBar = document.createElement("div");
    actionBar.setAttribute("class", "action-bar");
    this.container?.appendChild(actionBar);

    const refreshButton = document.createElement("button");
    refreshButton.setAttribute("id", "refresh_button");
    refreshButton.textContent = "Refresh Posts";
    refreshButton.addEventListener("click", () => {
      this.controller.loadPosts();
    });
    actionBar.appendChild(refreshButton);

    const groupedButton = document.createElement("button");
    groupedButton.setAttribute("id", "grouped_button");
    groupedButton.textContent = `Grouped: ${this.grouped ? "Yes" : "No"}`;
    groupedButton.addEventListener("click", () => {
      this.controller.toggleGrouped();
    });
    actionBar.appendChild(groupedButton);

    const sortedButton = document.createElement("button");
    sortedButton.setAttribute("id", "sorted_button");
    sortedButton.textContent = `Sorted: ${this.sorted ? "Yes" : "No"}`;
    sortedButton.addEventListener("click", () => {
      this.controller.toggleSorted();
    });
    actionBar.appendChild(sortedButton);
  }

  /**
   * Render posts items
   * @param {Post[] | null} posts
   */
  renderPosts(posts) {
    this.container.innerHTML = ""; // have space for future optimisation. see README.md
    this._renderActionBar();

    this.posts = posts;
    const isError = posts === null;
    if (isError) {
      const error = document.createElement("span");
      error.textContent = "Error loading posts";
      this.container.appendChild(error);
      return;
    }

    let finalPosts = [...posts].sort((a, b) => {
      if (this.grouped) {
        if (a.userId === b.userId && this.sorted) {
          return a.title > b.title ? 1 : -1;
        }

        return a.userId > b.userId ? 1 : -1;
      } else if (this.sorted) {
        return a.title > b.title ? 1 : -1;
      }

      return 0;
    });

    finalPosts.forEach((post) => {
      const postComponent = /** @type {PostItemComponent} */ (
        document.createElement("post-item")
      );
      postComponent.post = post;
      this.container.appendChild(postComponent);
    });
  }

  /**
   * Render a simple loading message
   */
  renderLoading() {
    this.container.innerHTML = ""; // have space for future optimisation. see README.md
    this._renderActionBar();
    this.container.innerHTML = "loading...";
  }

  /**
   * When component mounted, create container and attach styles
   */
  connectedCallback() {
    this.container = document.createElement("ol");
    this.container.setAttribute("class", "post-list-container");
    this.appendChild(this.container);

    this.controller.onViewMounted();
  }
}

customElements.define("post-list", PostListView);
