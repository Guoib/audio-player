class Player {
  protected audioContext: AudioContext;
  protected audioSource: AudioBufferSourceNode;
  protected audioAnalyser: AnalyserNode;

  constructor() {
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.audioSource = this.audioContext.createBufferSource()
    this.audioAnalyser = this.audioContext.createAnalyser()
  }

  get bufferLength() {
    return this.audioAnalyser.frequencyBinCount
  }

  private async main(url: string) {
    const audioBuffer = await this.loadAudio(url)
    this.audioSource.buffer = audioBuffer
    this.audioSource.connect(this.audioAnalyser)
    this.audioSource.connect(this.audioContext.destination)
  }

  private async loadAudio(url: string) {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    return Promise.resolve(audioBuffer)
  }

  public load(url: string) {
    this.main(url)
  }
}

export default Player