'use client'

import { useState } from "react"
import Entrada from "./entrada";

export default function Som (){
  const [volume, setVolume] = useState(0);
  return(
    <>
      <Entrada instrumento="Guitarra"></Entrada>
      <Entrada instrumento="Bateria"></Entrada>
      <Entrada instrumento="Microfone"></Entrada>
    </>
  )
}