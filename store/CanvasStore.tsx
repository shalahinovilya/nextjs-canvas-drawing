import {makeAutoObservable} from "mobx";


export class CanvasStore {

    private canvas : HTMLCanvasElement | null;
    private undoArr: string[]
    private redoArr : string[]
    constructor() {
        this.canvas = null
        this.undoArr = []
        this.redoArr = []
        makeAutoObservable(this)
    }

    public setCanvas (canvas : HTMLCanvasElement | null) {
        this.canvas = canvas
    }

    public getCanvas () {
        return this.canvas
    }

    public pushUndo (data: string | null) {
        data && this.undoArr.push(data)
    }

    public pushRedo (data: string | null) {
        data && this.redoArr.push(data)
    }

    public undo () {
        if (!this.canvas) return;
        const canvas = this.canvas
        const ctx = this.canvas.getContext('2d')

        if (this.undoArr.length) {
            const dataUrl = this.undoArr.pop() || ''
            this.pushRedo(this.canvas.toDataURL())
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                    ctx?.clearRect(0, 0, canvas.width, canvas.height)
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        } else {
            ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }

    }

   public redo () {
        if (!this.canvas) return;
        const canvas = this.canvas
        const ctx = this.canvas.getContext('2d')

        if (this.redoArr.length) {
            const dataUrl = this.redoArr.pop() || ''
            this.pushUndo(this.canvas.toDataURL())
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx?.clearRect(0, 0, canvas.width, canvas.height)
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        }

    }
}