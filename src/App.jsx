
import {useRef} from "react"
import {useState} from "react"
import {useEffect} from "react"
import './Photoshoot.css'
import Webcam from "react-webcam";
import Photobook from "./Photobook";

//Components

export default function App() {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isPictureSatisfactory, setIsPictureSatisfactory] = useState(false);
  const [imageList, setImageList] = useState([])
  const [displayCamera, setDisplayCamera] = useState(false);
  const [displayPhotobook, setDisplayPhotobook] = useState(false)

  const capture = () => {
    console.log("reached capture before crashing")
    const imageSrc = cameraRef.current.getScreenshot();
    setImage(imageSrc);
    setIsPictureSatisfactory(true);
  };


  console.log(`There are currently ${imageList.length} in the list`);
  console.log(imageList)

  function uploadImage(event){
    console.log("in upload image")
    event.preventDefault();
    if (image === null)
    {
      //maybe add a message to the user to take a picture first
      console.log("image is not added in, returning...")
      return;
    }

    setImageList(prev => {
      return (
        [...prev,
          {
            image : image,
            description : event.target.description.value
          }
        ]
      )
    })

    //resets
    setImage(null);
    setIsPictureSatisfactory(false);
    event.currentTarget.reset();
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
              }
            />
          </section>    

          {isPictureSatisfactory ? 
            <button onClick = {() => setIsPictureSatisfactory(false)} className = "retry">
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
            maxLength={150}
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
        <Photobook
          list = {imageList}
        />
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

    </main>

    
  )
}
