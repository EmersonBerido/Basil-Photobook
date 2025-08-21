
import {useRef} from "react"
import {useState} from "react"
import {useEffect} from "react"
import './Photoshoot.css'
import Webcam from "react-webcam";
import Photobook from "./Photobook";
import TakePhoto from "./TakePhoto.jsx";
import cat from "./assets/meow.png";
import characters from "./assets/Selections/characters.js";

import GlobalSubmission from "./GlobalSubmission.jsx";

//utils
import { getDatabaseEntries } from "./utils/backendUtils.js";

//Components

export default function App() {

  useEffect(() => {
    (async () => {
      const data = await getDatabaseEntries();
      console.log("data from backend", data);
    })()

  }, [])

  const [displayCamera, setDisplayCamera] = useState(false);
  const [displayPhotobook, setDisplayPhotobook] = useState(false)
  const [localStorageIndex, setLocalStorageIndex] = useState(localStorage.length);

  //REMOVE LATER
  const [showGlobalSub, setShowGlobalSub] = useState(false);
  const [globalSubmissionInfo, setGlobalSubmissionInfo] = useState(null)
  

  function EraseAllEntries() {
    localStorage.clear();
    setLocalStorageIndex(0);
    alert("Cleared all entries in photobook :3")
  }

  return (
    <main className = "program">
      
      {(!displayCamera && !displayPhotobook) &&
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

      {(displayCamera || displayPhotobook) && 
        <button
          className = "exit-button"
          onClick = { () => {
            setDisplayCamera(false);
            setDisplayPhotobook(false);
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
