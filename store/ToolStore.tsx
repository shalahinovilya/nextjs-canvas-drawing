import {makeAutoObservable} from "mobx";
import {Brush} from "../tools/Brush";
import {Rect} from "../tools/Rect";
import {Circle} from "../tools/Circle";
import {Eraser} from "../tools/Eraser";
import {Line} from "../tools/Line";

type ToolType = Brush | Rect | Circle | Eraser | Line | null

export class ToolStore {

    private currentTool: ToolType

    constructor() {
        this.currentTool = null
        makeAutoObservable(this)
    }

    public setStrokeColor (color : string) {
        if (this.currentTool) this.currentTool.strokeColor = color
    }

    public setLineWidth(width: number) {
        if (this.currentTool) this.currentTool.lineWidth = width
    }

    public setCurrentTool (tool: ToolType) {
        this.currentTool = tool
    }
}