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
        <h3>${this.post?.title}</h3>
        <span>${this.post?.body}</span>
        <span>${this.post?.userId}</span>
      </li>
    `;
  }
}

customElements.define("post-item", PostItemView);
