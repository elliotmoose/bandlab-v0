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
};
