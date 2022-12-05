import styles from '../styles/Home.module.scss'
import ToolBar from "../components/ToolBar";
import SettingBar from "../components/SettingBar";
import Canvas from "../components/Canvas";

export default function Home() {
  return (
    <div className={styles.app}>
        <ToolBar/>
        <SettingBar/>
        <Canvas/>
    </div>
  )
}
