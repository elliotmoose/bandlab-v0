class SamplePlayerView extends HTMLElement {
  /**
   * @type {SamplePlayerController}
   */
  controller;
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
      audioName.textContent = audioPath.split("/").pop();
      audioResourceItem.appendChild(audioName);

      const playButton = document.createElement("button");
      playButton.textContent = "Play";
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
