import {Tool} from "./Tool";

export class Circle extends Tool {

    private isMouseDown : boolean
    private circle : {x: number, y: number, startAngle: number, endAngle: number, radius: number,  minRadius: number}
    private savedImg : string

    public constructor(canvas: HTMLCanvasElement | null) {
        super(canvas)
        this.isMouseDown = false
        this.circle = {x: 200, y: 100, startAngle: 0, endAngle: Math.PI * 2, radius: 10, minRadius: 20}
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
        this.circle.x = pageX - offsetLeft - this.circle.minRadius
        this.circle.y = pageY - offsetTop
        this.savedImg = this.canvas?.toDataURL() || ''
        this.isMouseDown = true
    }

    private mouseMoveHandler (e : MouseEvent) {
        if (!this.isMouseDown) return;
        const {pageX, pageY} = e
        const {offsetLeft, offsetTop} = (e.target as HTMLInputElement)
        const mouseX = pageX - offsetLeft
        const mouseY = pageY - offsetTop
        const radius = Math.abs(mouseX + mouseY - (this.circle.x + this.circle.y))
        this.circle.radius = radius >= this.circle.minRadius ? radius : this.circle.minRadius
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
                this.ctx?.arc(this.circle.x, this.circle.y, this.circle.radius, this.circle.startAngle, this.circle.endAngle)
                this.ctx?.stroke()
            }
        }
    }
}