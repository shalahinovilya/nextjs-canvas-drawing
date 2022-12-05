import React, {ChangeEvent, useContext} from 'react';
import styles from '../styles/SettingBar.module.scss'
import {Context} from "../pages/_app";
import {observer} from "mobx-react";

const SettingBar = observer(() => {

    const {tool} = useContext(Context)
    function lineWidthHandler (e: ChangeEvent<HTMLInputElement>) {
        const width = (e.target as HTMLInputElement).value
        tool.setLineWidth(+width)
    }

    return (
        <div className={styles['setting-bar']}>
            <div className={styles['line-width']}>
                <label htmlFor="line-width" className={styles['label']}>Line width:</label>
                <input
                    id="line-width"
                    className={styles['line-width-input']}
                    type="range"
                    min={1}
                    max={50}
                    defaultValue={1}
                    onChange={e => lineWidthHandler(e)}
                />
            </div>
        </div>
    );
});

export default SettingBar;