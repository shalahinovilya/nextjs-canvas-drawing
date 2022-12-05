export class Tool {

    readonly canvas: HTMLCanvasElement | null;
    readonly ctx: CanvasRenderingContext2D | null;

    public constructor(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas
        this.ctx = canvas?.getContext('2d') || null
        this.clear()
    }

    private clear () {
        if (!this.canvas) return;
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
        this.canvas.onmouseup = null
    }

    public set strokeColor (color : string) {
        if (this.ctx) this.ctx.strokeStyle = color
    }

    public set lineWidth (width : number) {
        if (this.ctx) this.ctx.lineWidth = width
    }
}