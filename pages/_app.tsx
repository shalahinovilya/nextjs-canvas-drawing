import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, {createContext} from "react";
import {CanvasStore} from "../store/CanvasStore";
import {ToolStore} from "../store/ToolStore";


const defaultValue = {canvas: new CanvasStore, tool: new ToolStore}

export const Context = createContext(defaultValue)

export default function App({ Component, pageProps }: AppProps) {
  return(
      <Context.Provider value={{canvas: new CanvasStore(), tool: new ToolStore()}}>
        <Component {...pageProps} />
      </Context.Provider>
  )
}
