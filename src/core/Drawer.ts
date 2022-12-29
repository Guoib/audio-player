import Player from "./Player"

type Point = { x: number, y: number }
type RGBParser = (v: number) => ({ r: number, g: number, b: number })

class Drawer {
  static WIDTH: number = 1000
  static HEIGHT: number = 800

  protected player: Player
  protected canvas: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D

  constructor(player: Player) {
    this.player = player
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  private defaultRGB(v: number) {
    return {
      r: v,
      g: 255 - v,
      b: 2 * v
    }
  }

  public drawCurve(data: number[], RGBParser: RGBParser = this.defaultRGB) {
    const barWidth = (Drawer.WIDTH / this.player.bufferLength)
    let x = 0

    for (let i = 1; i < data.length - 1; i++) {
      const v = data[i]
      this.ctx.beginPath()
      const { r, g, b } = RGBParser(v)
      this.ctx.strokeStyle = `rgb(${r},${g},${b})`
      const beginPoint = { x: x - 0.5, y: Drawer.HEIGHT - data[i - 1] }
      const controlPoint = { x, y: Drawer.HEIGHT - data[i] }
      const endPoint = { x: x + 0.5, y: Drawer.HEIGHT - (data[i] + data[i + 1]) / 2 }
      this.drawBezier(beginPoint, controlPoint, endPoint)
      x += barWidth + 1
    }
  }

  private drawBezier(beginPoint: Point, controlPoint: Point, endPoint: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(beginPoint.x, beginPoint.y);
    this.ctx.quadraticCurveTo(
      controlPoint.x,
      controlPoint.y,
      endPoint.x,
      endPoint.y
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Drawer