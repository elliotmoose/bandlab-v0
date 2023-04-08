class SamplePlayerController {
  /**
   * @type {AudioContext | null}
   */
  context = null;

  /**
   * @type {SamplePlayerView}
   */
  view;

  constructor(view) {
    this.view = view;
  }

  async playAudio(audioPath) {
    this.initIfNeeded();
    // load audio file
    const audioData = await AudioService.loadAudio(audioPath);
    this.context.decodeAudioData(audioData, (buffer) => {
      // create a new source
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.context.destination);
      source.start();
    });
  }

  async loadAudioResources() {
    const audioPaths = await AudioService.getAudioResources();
    this.view.renderAudioResources(audioPaths);
  }

  initIfNeeded() {
    // requires user action
    if (this.context) return;
    this.context = new AudioContext();
  }

  onViewMounted() {
    try {
      this.loadAudioResources();
    } catch (e) {
      console.error("Audio Context init fail:", e);
    }
  }
}
