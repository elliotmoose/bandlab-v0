class SamplePlayerController {
  /**
   * @type {AudioContext | null}
   */
  context = null;

  /**
   * @type {SamplePlayerView}
   */
  view;

  /**
   * @type {{ [audioName: string]: { isPlaying: boolean; source: AudioBufferSourceNode; audioBuffer: AudioBuffer; }}}
   */
  state = {};

  /**
   * @type {string[]} list of path names
   */
  audioResources = [];

  /**
   *
   * @param {SamplePlayerView} view
   */
  constructor(view) {
    this.view = view;
  }

  /**
   * @param {string} audioPath
   */
  async playAudio(audioPath) {
    this.initIfNeeded();

    if (!this.context) {
      console.error("cannot play without audio context");
      return;
    }

    const isPlaying =
      this.state[audioPath] !== undefined &&
      this.state[audioPath].isPlaying === true;

    if (!isPlaying) {
      let audioBuffer = this.state[audioPath]?.audioBuffer;
      const needsLoading = audioBuffer === undefined;

      if (needsLoading) {
        // load audio file
        try {
          const audioData = await AudioService.loadAudio(audioPath);
          audioBuffer = await this.context.decodeAudioData(audioData);
        } catch (error) {
          console.error("decode audio buffer failed:", error);
          return;
        }
      }

      if (audioBuffer) {
        // create a new source
        const source = this.context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.context.destination);
        source.start();

        this.state[audioPath] = {
          isPlaying: true,
          audioBuffer,
          source,
        };
      }
    } else {
      // cleanup old source
      this.state[audioPath].source.disconnect(this.context.destination);
      this.state[audioPath].isPlaying = false;
    }

    // update view
    this.view.renderAudioResources(this.audioResources);
  }

  /**
   *
   * @param {string} audioPath
   */
  isAudioPlaying(audioPath) {
    return this.state[audioPath]?.isPlaying === true;
  }

  async loadAudioResources() {
    const audioResources = await AudioService.getAudioResources();
    this.audioResources = audioResources;
    this.view.renderAudioResources(audioResources);
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
