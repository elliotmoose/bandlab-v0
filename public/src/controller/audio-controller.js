const AudioController = {
  async loadAudioNames() {
    const audioNames = await AudioService.getAudioResources();
    console.log(audioNames);
    return audioNames ?? [];
  },
};
