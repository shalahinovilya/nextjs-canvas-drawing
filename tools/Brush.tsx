import {Tool} from "./Tool";

export class Brush extends Tool {

    private isMouseDown : boolean

    public constructor(canvas: HTMLCanvasElement | null) {
        super(canvas)
        this.isMouseDown = false
        this.startListening()
    }

    private startListening () {
        if (this.canvas) {
            this.canvas.onmousedown = this.mouseDownHandler.bind(this)
            this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
            this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        }
    }

    private mouseDownHandler (e : MouseEvent) {
        const {pageX, pageY} = e
        const {offsetLeft, offsetTop} = (e.target as HTMLInputElement)
        this.ctx?.beginPath()
        this.ctx?.moveTo(pageX - offsetLeft, pageY - offsetTop)
        this.isMouseDown = true
    }

    private mouseMoveHandler (e : MouseEvent) {
        if (!this.isMouseDown) return;
        const {pageX, pageY} = e
        const {offsetLeft, offsetTop} = (e.target as HTMLInputElement)
        this.draw(pageX - offsetLeft, pageY - offsetTop)
    }

    private mouseUpHandler () {
        this.isMouseDown = false
    }

    protected draw (x: number, y: number) {
        this.ctx?.lineTo(x, y)
        this.ctx?.stroke()
    }
}