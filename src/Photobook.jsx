import "./Photobook.css"
import {useState} from "react"
import { useEffect } from "react";
import TextImage1 from "./assets/journal-entry-1.png";
import TextImage2 from "./assets/journal-entry-2.png";
import BlueHand from "./assets/blue-hand.png";
import Arrow from "./assets/normal-arrow.png"

export default function Photobook(){
  const [pageNumber, setPageNumber] = useState(0);
  const [zoomDisplay, setZoomDisplay] = useState(null);

  //checks if pageNumber is less than 0
  useEffect(() => {
    if (pageNumber < 0)
    {
      setPageNumber(0);
    }


  }, [pageNumber])

  //creates a new layer to show an enlarged version of the image and text
  function zoomInPhoto(entry){
    setZoomDisplay(() => {
      console.log("adding in this entry: "+entry);
      return {
        image : entry.image,
        description : entry.description
      }
    })
    
    
  }

  //creates visible entries for photobook
  const startingIndex = Math.abs(pageNumber * 6);
  let entries = [];
  for (let i = startingIndex; i < startingIndex + 6; i++){
    if (i >= localStorage.length){
      break;
    }
    if (i % 2 === 0){


      //localstorage version
      entries.push(
      <section className = "entry">
          <button
            onClick = {() => zoomInPhoto(JSON.parse(localStorage.getItem(i)))}
            className = "description-button"
          >
            <div className = "polaroid">
              <img src = {JSON.parse(localStorage.getItem(i)).image} className = "photo"/>
            </div>
            <img src = {TextImage1} />
          </button>
        </section>
      );
    }
    else
    {
      entries.push(
        <section className = "entry">
        <button
            onClick = {() => zoomInPhoto(JSON.parse(localStorage.getItem(i)))}
            className = "description-button"
          >
            <img src = {TextImage2} />

            <div className = "polaroid">
              <img src = {JSON.parse(localStorage.getItem(i)).image} className = "photo"/>
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
          {pageNumber !== 0 && <img src = {Arrow} alt = "prev page"/>}
        </button>

        <button 
          onClick = {() => setPageNumber(prev => prev + 1)}
          className = "next-page"
        >
          {(1 + pageNumber) * 6 < localStorage.length && <img src = {Arrow} alt = "next page"/> }
        </button>
      </div>

      {zoomDisplay !== null &&
        <section className = "zoom-container">
          <img className = "zoom-polaroid" src = {zoomDisplay.image}/>
          <div className="zoom-textbox">
            <p className = "zoom-description">{zoomDisplay.description}</p>
            <button className = "text-exit" onClick = {() => setZoomDisplay(null)}>
              <img src = {BlueHand}/>
            </button>
          </div>
        </section>
      }


    </section>
  )
}