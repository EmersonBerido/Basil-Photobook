import {useState, useRef} from "react";
import Webcam from "react-webcam";
import GlobalSubmission from "./GlobalSubmission";
import "./TakePhoto.css"
import Cat from "./Cat.jsx"

export default function TakePhoto(props){
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isPictureSatisfactory, setIsPictureSatisfactory] = useState(false);
  const [localStorageIndex, setLocalStorageIndex] = useState(localStorage.length);

  const [displayGSPrompt, setDisplayGSPrompt] = useState(false);

  const [displayGS, setDisplayGS] = useState(false);
  const [globalSubmissionInfo, setGlobalSubmissionInfo] = useState(null)

  console.log("displayGS", displayGS)

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
        console.log("error", error);
      }
  
      //--Saves image and description before displaying global submission form
      setGlobalSubmissionInfo(
        <GlobalSubmission
          image = {image}
          description = {description}
          setDisplayCamera = {props.setDisplayCamera}
        />
      )
  
      //resets states
      setImage(null);
      setIsPictureSatisfactory(false);

      //activates state to ask user if they want to submit entry globally
      setDisplayGSPrompt(true);
  
    }



  return (
    <main className = "black-box">
      {(!displayGS && !displayGSPrompt) &&
      <main className="photoshoot-box-container">

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
                  width  : 400,
                  height : 400
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
            </button> 
            :
            <button onClick = {capture} className = "snap">
              snap!
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
              submit?
            </button>
          </form>
       
      </main>
      }

      {displayGSPrompt &&
        <section className="gs-prompt-container">
          <div className="gs-text-container">
            <h1>Would You like to submit to the shared photobook?</h1>
            <small>This action can't be reversed...</small> 
          </div>
          <Cat/>
          <div className="gs-buttons-container">
            <button 
            onClick={
              () => {
                setDisplayGS(true)
                setDisplayGSPrompt(false)
              }
            }
            >
              yes
            </button>
            <button onClick={() => props.setDisplayCamera(false)}>no</button>
          </div>
        </section>
      }

      {displayGS && globalSubmissionInfo}
    </main>
  )
}