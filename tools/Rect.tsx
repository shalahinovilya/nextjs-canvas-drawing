import {Tool} from "./Tool";

export class Rect extends Tool {

    private isMouseDown : boolean
    private rect : {startX: number, startY: number, width: number, height: number}
    private savedImg : string

    public constructor(canvas: HTMLCanvasElement | null) {
        super(canvas)
        this.isMouseDown = false
        this.rect = {startX: 0, startY: 0, width: 0, height: 0}
        this.savedImg = ''
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
        this.rect.startX = pageX - offsetLeft
        this.rect.startY = pageY - offsetTop
        this.savedImg = this.canvas?.toDataURL() || ''
        this.isMouseDown = true
    }

    private mouseMoveHandler (e : MouseEvent) {
        if (!this.isMouseDown) return;
        const {pageX, pageY} = e
        const {offsetLeft, offsetTop} = (e.target as HTMLInputElement)
        const mouseX = pageX - offsetLeft
        const mouseY = pageY - offsetTop
        this.rect.width = mouseX - this.rect.startX
        this.rect.height = mouseY - this.rect.startY
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
                this.ctx?.rect(this.rect.startX, this.rect.startY, this.rect.width, this.rect.height)
                this.ctx?.stroke()
            }
        }
    }
}