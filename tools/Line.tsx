import {Tool} from "./Tool";

export class Line extends Tool {

    private isMouseDown : boolean
    private savedImg : string
    private line: {startX: number, startY: number, mouseX: number, mouseY: number}

    public constructor(canvas: HTMLCanvasElement | null) {
        super(canvas)
        this.isMouseDown = false
        this.savedImg = ''
        this.line = {startX: 0, startY: 0, mouseX: 0, mouseY: 0}
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
        this.line.startX = pageX - offsetLeft
        this.line.startY = pageY - offsetTop
        this.savedImg = this.canvas?.toDataURL() || ''
        this.isMouseDown = true
    }

    private mouseMoveHandler (e : MouseEvent) {
        if (!this.isMouseDown) return;
        const {pageX, pageY} = e
        const {offsetLeft, offsetTop} = (e.target as HTMLInputElement)
        this.line.mouseX = pageX - offsetLeft
        this.line.mouseY = pageY - offsetTop
        this.draw()
    }

    private mouseUpHandler () {
        this.isMouseDown = false
    }

    private draw () {
        const img = new Image()
        img.src = this.savedImg
        img.onload = () => {
            if (this.canvas) {
                this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                this.ctx?.beginPath()
                this.ctx?.moveTo(this.line.startX, this.line.startY)
                this.ctx?.lineTo(this.line.mouseX, this.line.mouseY)
                this.ctx?.stroke()
            }
        }
    }
}