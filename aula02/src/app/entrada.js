import { useState } from "react"

export default function Entrada({ instrumento }){

    const [volume, setVolume] = useState(0);

    const handleVolume = (x) => {
        if(x === true && volume < 10)
            setVolume(volume + 1);
        if(x === false && volume > 0)
            setVolume(volume - 1);
    }
    return(
    <div className="flex flex-row ml-4 mt-4">
      <button className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 cursorpointer active:bg-red-800" onClick={() => {handleVolume(false)}}>-</button>
      <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 cursorpointer active:bg-blue-800" onClick={() => {handleVolume(true)}} >+</button>
      <p>Volume {instrumento}: {volume}</p>
    
    </div>
    )
} 