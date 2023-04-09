class SamplePlayerView extends HTMLElement {
  /**
   * @type {SamplePlayerController}
   */
  controller;

  /**
   * @type {HTMLOListElement}
   */
  container;
  constructor() {
    super();
    this.controller = new SamplePlayerController(this);
  }

  /**
   *
   * @param {string[]} audioPaths
   */
  renderAudioResources(audioPaths) {
    this.container.innerHTML = "";
    audioPaths.forEach((audioPath) => {
      const audioResourceItem = document.createElement("li");
      audioResourceItem.setAttribute("class", "audio-resource-item");

      const audioName = document.createElement("span");
      audioName.textContent = audioPath.split("/").pop() ?? audioPath;
      audioResourceItem.appendChild(audioName);

      const isPlaying = this.controller.isAudioPlaying(audioPath);
      const playButton = document.createElement("button");
      playButton.textContent = isPlaying ? "Stop" : "Play";
      playButton.addEventListener("click", () => {
        this.controller.playAudio(audioPath);
      });

      audioResourceItem.appendChild(playButton);

      this.container.appendChild(audioResourceItem);
    });
  }

  connectedCallback() {
    this.container = document.createElement("ol");
    this.container.setAttribute("class", "audio-resources-container");
    this.appendChild(this.container);
    this.controller.onViewMounted();
  }
}

customElements.define("sample-player", SamplePlayerView);
