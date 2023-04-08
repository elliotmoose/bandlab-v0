class PostItemView extends HTMLElement {
  /**
   * @type {Post | null}
   */
  post = null;
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <li class="post-item-container">        
        <span>user id: ${this.post?.userId}</span>
        <h3>${this.post?.title}</h3>
        <p>${this.post?.body}</p>
      </li>
    `;
  }
}

customElements.define("post-item", PostItemView);
