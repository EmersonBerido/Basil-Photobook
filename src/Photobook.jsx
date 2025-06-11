import "./Photobook.css"
import {useState} from "react"
import { useEffect } from "react";

export default function Photobook(props){
  //only want to display 6 images: 3 per page
  //should have a state for page number
  //buttons to turn pages
  console.log(props.list);
  const [pageNumber, setPageNumber] = useState(0);
  const [zoomDisplay, setZoomDisplay] = useState(null)

  if (props.list.length > 0)
  {
    console.log("Now there are atleast 1 object in photobook")
  }

  //checks if pageNumber is less than 0
  useEffect(() => {
    console.log("Before: Page " + pageNumber);
    if (pageNumber < 0)
    {
      setPageNumber(0);
        console.log("After: Page " + pageNumber)

    }


  }, [pageNumber])

  //create whole array of images
  const images = props.list.map((obj, index) => {
    return (
      <section className = "entry" key = {index}>
        <img src = {obj.image}/>
        <p>{obj.description}</p>
      </section>

    )

  })

  function zoomInPhoto(entry){
    //prints out large photo with black textbox in the bottom & an exit button at the bottom right of the textbox (in css, blur the background so only the new things are visible)
    //create a state which checks if it is empty, if so skip. If not, display the information inside it which will have the format below
    //now the exit button will make the state empty again;maybe have a function that fills in the state

    setZoomDisplay(() => {
      return {
        image : entry.image,
        description : entry.description
      }
    })
    
    
  }


  const startingIndex = Math.abs(pageNumber * 6);
  let entries = [];
  for (let i = startingIndex; i < startingIndex + 6; i++){
    if (i >= props.list.length){
      break;
    }
    if (i % 2 === 0){
      entries.push(
      <section className = "entry">
          <button
            onClick = {() => zoomInPhoto(props.list[i])}
            className = "description-button"
          >
            <div className = "polaroid">
              <img src = {props.list[i].image} className = "photo"/>
            </div>
            <img src = "src/assets/journal-entry-1.png" />
          </button>
        </section>
      );
    }
    else
    {
      entries.push(
        <section className = "entry">
        <button
            onClick = {() => zoomInPhoto(props.list[i])}
            className = "description-button"
          >
            <img src = "src/assets/journal-entry-2.png" />

            <div className = "polaroid">
              <img src = {props.list[i].image} className = "photo"/>
            </div>
        </button>
      </section>
      );
    }
  }

  const leftPage = entries.slice(0,3);
  const rightPage = entries.slice(3);


  return(
    <section className = "book">
      <main className = "pages">
        <div className = "leftPage">
          {leftPage}
        </div>
        <div className = "rightPage">
          {rightPage}
        </div>
      </main>

      <div className = "button-container">

        <button 
          onClick = {() => setPageNumber(prev => prev - 1)}
          className = "prev-page"
        >
          {pageNumber !== 0 && <img src = "src\assets\normal-arrow.png" alt = "prev page"/>}
        </button>

        <button 
          onClick = {() => setPageNumber(prev => prev + 1)}
          className = "next-page"
        >
          {(1 + pageNumber) * 6 < props.list.length && <img src = "src\assets\normal-arrow.png" alt = "next page"/> }
        </button>
      </div>

      {zoomDisplay !== null &&
        <section className = "zoom-container">
          <img className = "zoom-polaroid" src = {zoomDisplay.image}/>
          <div className="zoom-textbox">
            <p className = "zoom-description">{zoomDisplay.description}</p>
            <button className = "text-exit" onClick = {() => setZoomDisplay(null)}>
              Exit
            </button>
          </div>
        </section>
      }

    </section>
  )
}