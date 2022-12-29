class Player {
  static WIDTH: number = 1000
  static HEIGHT: number = 800
  protected canvas: HTMLCanvasElement;
  protected audioContext: AudioContext;
  protected audioSource: AudioBufferSourceNode;
  protected audioAnalyser: AnalyserNode;

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = Player.WIDTH
    this.canvas.height = Player.HEIGHT
    // @ts-ignore
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.audioSource = this.audioContext.createBufferSource()
    this.audioAnalyser = this.audioContext.createAnalyser()
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