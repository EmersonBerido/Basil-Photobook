
import {useRef} from "react"
import {useState} from "react"
import {useEffect} from "react"
import './Photoshoot.css'
import Webcam from "react-webcam";
import Photobook from "./Photobook";
import cat from "./assets/meow.png";

//utils
import { getDatabaseEntries, uploadToDatabase } from "./utils/backendUtils.js";

//Components

export default function App() {

  useEffect(() => {
    (async () => {
      const data = await getDatabaseEntries();
      console.log("data from backend", data);
    })()

  }, [])

  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isPictureSatisfactory, setIsPictureSatisfactory] = useState(false);
  const [displayCamera, setDisplayCamera] = useState(false);
  const [displayPhotobook, setDisplayPhotobook] = useState(false)
  const [localStorageIndex, setLocalStorageIndex] = useState(localStorage.length);

  const capture = () => {
    const imageSrc = cameraRef.current.getScreenshot();
    setImage(imageSrc);
    setIsPictureSatisfactory(true);
  };

  function uploadImage(event){
    //prevents page from refreshing
    event.preventDefault();

    //checks if user snapped a picture first
    if (image === null)
    {
      return;
    }

    //adds entry into local storage
    const description = event.target.description.value;
    try {
      localStorage.setItem(localStorageIndex, JSON.stringify({
        image : image,
        description : description
      }))
      setLocalStorageIndex(prev => prev + 1 );
      
    } catch (error) {
      alert("There is no more available storage for entries. If you wish to save more, you'll need to delete all entries by clicking the cat on the bottom left corner");
    }

    //convert image via cloudinary
    //imageToURL(image);
    
    //follow this format if user wants to upload to database
    // (async () => {await uploadToDatabase(
    //   "Emerson",
    //   image,
    //   "Boy1 for Default Testing",
    //   description
    // )})();

    //resets states
    setImage(null);
    setIsPictureSatisfactory(false);

  }

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

     {displayCamera && <main className = "black-box">
        <div className = "camera-snap-container">
          <section className = "polaroid-frame">
          
            {image === null ? 
              <Webcam
              className = {"camera"}
              ref = {cameraRef}
              screenshotFormat = "image/png"
              mirrored = {true}
              videoConstraints={
                {
                  width  : 300,
                  height : 300
                }
              }/> :
              <img src = {image} className = "camera"/>
            }

          </section>    

          {isPictureSatisfactory ? 
            <button onClick = {() => {
              setIsPictureSatisfactory(false);
              setImage(null)
            }} 
              className = "retry"
            >
              redo ?
            </button> :
            <button onClick = {capture} className = "snap">
              s n a p !
            </button>
          }
        </div>
        

        <form onSubmit = {uploadImage} className = "submit-container">
          <textarea 
            placeholder="Enter description here..." 
            name = "description"
            className = "description-input"
            required
            maxLength={200}
          />
          <button 
            type = "submit"
            className = "submit"
          >
            s u b m i t ?
          </button>
        </form>

      </main>
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
