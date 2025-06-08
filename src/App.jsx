
import {useRef} from "react"
import {useState} from "react"
import {useEffect} from "react"
import './Photoshoot.css'
import Webcam from "react-webcam";

export default function App() {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([])

  const capture = () => {
    console.log("reached capture before crashing")
    const imageSrc = cameraRef.current.getScreenshot();
    setImage(imageSrc);
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
  }


  return (
    <main>
      <h2>smile</h2>

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

      <button onClick = {capture}>
        Take Picture
      </button>

      <form onSubmit = {uploadImage}>
        <input 
          placeholder="Enter description here..." 
          name = "description"
        />
        <button type = "submit">Submit</button>
      </form>

      {imageList.length > 0 &&
      <>
        <section>
          <img src = {imageList[0].image}/>
        </section>
        <h1>{imageList[0].description}</h1>
      </>
      }
    </main>
  )
}
