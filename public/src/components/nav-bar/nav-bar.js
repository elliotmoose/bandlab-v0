class NavBarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <ul class="nav-bar">
        <li><a href="/posts">Posts</a></li>
        <li><a href="/player">Player</a></li>    
      </ul>
    `;
  }
}

customElements.define("nav-bar", NavBarComponent);
