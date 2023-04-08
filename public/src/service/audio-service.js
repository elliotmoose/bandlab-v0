const AudioService = {
  /**
   * Loads Audios from api
   * @returns {Promise<Array<string>>}
   */
  getAudioResources: async () => {
    const response = await fetch("/audio");
    const audioResources = await response.json();
    return audioResources;
  },
  /**
   * @param {string} audioPath
   * @returns {Promise<ArrayBuffer>}
   */
  loadAudio: async (audioPath) => {
    const response = await fetch(audioPath);
    const audio = await response.arrayBuffer();
    return audio;
  },
};
