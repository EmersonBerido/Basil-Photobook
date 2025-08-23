
import {useRef} from "react"
import {useState} from "react"
import {useEffect} from "react"
import './Photoshoot.css'
import Photobook from "./Photobook";
import TakePhoto from "./TakePhoto.jsx";
import GlobalPhotobook from "./GlobalPhotobook.jsx";
import cat from "./assets/meow.png";


//Components

export default function App() {

  const [displayCamera, setDisplayCamera] = useState(false);
  const [displayPhotobook, setDisplayPhotobook] = useState(false)
  const [localStorageIndex, setLocalStorageIndex] = useState(localStorage.length);
  const [displayGPhotobook, setDisplayGPhotobook] = useState(false);


  function EraseAllEntries() {
    localStorage.clear();
    setLocalStorageIndex(0);
    alert("Cleared all entries in photobook :3")
  }

  return (
    <main className = "program">
      
      {(!displayCamera && !displayPhotobook && !displayGPhotobook) &&
      <header className = "menu">
        <h1>Photobook</h1>
        <button
          className = "camera-option"
          onClick={() => setDisplayCamera(true)}
        >
          Take Pictures
        </button>
        <button
          className="photobook-option"
          onClick={() => setDisplayPhotobook(true)}
        >
          Photobook
        </button>
        <button onClick={() => setDisplayGPhotobook(true)}>
          Global
        </button>
      </header>
      }

      {displayCamera && 
        <TakePhoto
          setDisplayCamera = {setDisplayCamera}
        />
      }


      {displayPhotobook &&
        <Photobook/>
      }

      {displayGPhotobook && <GlobalPhotobook/>
      }

      {(displayCamera || displayPhotobook || displayGPhotobook) && 
        <button
          className = "exit-button"
          onClick = { () => {
            setDisplayCamera(false);
            setDisplayPhotobook(false);
            setDisplayGPhotobook(false);
          }}
        >
          X
        </button>
      }

      <button onClick = {EraseAllEntries} className = "clear-photos-button">
        <span className = "clear-photos-prompt">Reset?</span>
        <img src = {cat} className = "reset-cat"/>
      </button>

    </main>

    
  )
}
