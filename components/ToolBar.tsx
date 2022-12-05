import React, {ChangeEvent, useContext} from 'react';
import styles from '../styles/ToolBar.module.scss'
import {observer} from "mobx-react";
import {Context} from "../pages/_app";
import {Brush} from "../tools/Brush";
import {Rect} from "../tools/Rect";
import {Circle} from "../tools/Circle";
import {Eraser} from "../tools/Eraser";
import {Line} from "../tools/Line";


const ToolBar = observer(() => {

    const {canvas, tool} = useContext(Context)

    function strokeColorHandler (e: ChangeEvent<HTMLInputElement>) {
        const color = (e.target as HTMLInputElement).value
        tool.setStrokeColor(color)
    }

    return (
        <div className={styles.toolbar}>
            <div className={styles['left-tools']}>
                <button
                    className={`${styles['left-tools__item']} ${styles['brush']}`}
                    onClick={() => tool.setCurrentTool(new Brush(canvas.getCanvas()))}
                >
                </button>
                <button
                    className={`${styles['left-tools__item']} ${styles['rect']}`}
                    onClick={() => tool.setCurrentTool(new Rect(canvas.getCanvas()))}
                >
                </button>
                <button
                    className={`${styles['left-tools__item']} ${styles['circle']}`}
                    onClick={() => tool.setCurrentTool(new Circle(canvas.getCanvas()))}
                ></button>
                <button
                    className={`${styles['left-tools__item']} ${styles['eraser']}`}
                    onClick={() => tool.setCurrentTool(new Eraser(canvas.getCanvas()))}
                ></button>
                <button
                    className={`${styles['left-tools__item']} ${styles['line']}`}
                    onClick={() => tool.setCurrentTool(new Line(canvas.getCanvas()))}
                >
                </button>
                <input
                    type="color"
                    style={{marginLeft: 10}}
                    onChange={(e) => strokeColorHandler(e)}
                >
                </input>
            </div>
            <div className="toolbar__right-tools right-tools">
                <button
                    className={`${styles['right-tools__item']} ${styles['undo']}`}
                    onClick={() => canvas.undo()}
                >
                </button>
                <button
                    className={`${styles['right-tools__item']} ${styles['redo']}`}
                    onClick={() => canvas.redo()}
                ></button>
            </div>
        </div>
    );
});

export default ToolBar;