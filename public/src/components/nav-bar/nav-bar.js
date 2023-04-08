class NavBarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // get current window path i.e. /posts or /player
    const path = window.location.pathname;

    const ul = document.createElement("ul");
    ul.setAttribute("class", "nav-bar");

    const postsLink = document.createElement("a");
    postsLink.setAttribute("href", "/posts");
    postsLink.setAttribute(
      "style",
      `text-decoration: none; color: ${
        path === "/posts" ? "black" : "#ccc"
      }; font-weight: bold;`
    );
    postsLink.textContent = "Posts";

    const playerLink = document.createElement("a");
    playerLink.setAttribute("href", "/player");
    playerLink.setAttribute(
      "style",
      `text-decoration: none; color: ${
        path === "/player" ? "black" : "#ccc"
      }; font-weight: bold;`
    );
    playerLink.textContent = "Player";

    const postsLi = document.createElement("li");
    postsLi.appendChild(postsLink);
    ul.appendChild(postsLi);

    const playerLi = document.createElement("li");
    playerLi.appendChild(playerLink);
    ul.appendChild(playerLi);

    this.appendChild(ul);
  }
}

customElements.define("nav-bar", NavBarComponent);
