import React, {useContext, useEffect, useRef} from 'react';
import styles from '../styles/Canvas.module.scss'
import {observer} from "mobx-react";
import {Context} from "../pages/_app";
import {Brush} from "../tools/Brush";


const Canvas = observer(() => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {canvas, tool} = useContext(Context)

    useEffect(() => {
        canvas.setCanvas(canvasRef.current)
        tool.setCurrentTool(new Brush(canvas.getCanvas()))
    }, [])

    function mouseUpHandler () {
        canvas.pushUndo(canvasRef.current?.toDataURL() || null)
    }

    return (
        <div className={styles['canvas']}>
            <canvas
                onMouseDown={mouseUpHandler}
                ref={canvasRef}
                style={{background: 'white', border: '1px solid black'}}
                width={600}
                height={400}
            />
        </div>
    );
});

export default Canvas;