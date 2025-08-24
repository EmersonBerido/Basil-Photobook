
import {useRef} from "react"
import {useState} from "react"
import {useEffect} from "react"
import './Photoshoot.css'
import Photobook from "./Photobook";
import TakePhoto from "./TakePhoto.jsx";
import GlobalPhotobook from "./GlobalPhotobook.jsx";
import cat from "./assets/meow.png";
import Cat from "./Cat.jsx"

//Components

export default function App() {

  const [displayCamera, setDisplayCamera] = useState(false);
  const [displayPhotobook, setDisplayPhotobook] = useState(false)
  const [displayGPhotobook, setDisplayGPhotobook] = useState(false);
  const [promptErase, setPromptErase] = useState(false);


  function EraseAllEntries() {
    localStorage.clear();
    alert("Cleared all entries in photobook :3")
  }



  return (
    <main className = "program">
      
      {(!displayCamera && !displayPhotobook && !displayGPhotobook) &&
      <header className = "menu">
        <h1>Photobook</h1>
        <button
          className = "option"
          onClick={() => setDisplayCamera(true)}
        >
          Take Pictures
        </button>
        <button
          className="option"
          onClick={() => setDisplayPhotobook(true)}
        >
          Photobook
        </button>
        <button 
          className="option"
          onClick={() => setDisplayGPhotobook(true)}
        >
          Global
        </button>
        <button 
          onClick={() => setPromptErase(true)}
          className="erase-option"
        >
          <Cat/>
        </button>

        {promptErase &&
          <main className="erase-container">
            <h1>Clear Photobook?</h1>
            <section className="erase-buttons-container">
              <button onClick={() => setPromptErase(false)}>
                No
              </button>
              <button onClick={EraseAllEntries}>
                Yes
              </button>
            </section>
          </main>
        }
        
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

    </main>

    
  )
}
