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
  const [displayRightPage, setDisplayRightPage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const [isMobile, setIsMobile] = useState(windowWidth < 600);

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

  function incrementPageNumber() {
    if (isMobile && !displayRightPage) {
      setDisplayRightPage(true);
    }
    else if(isMobile && displayRightPage) {
      setPageNumber(prev => prev + 1);
      setDisplayRightPage(false);
    }
    else {
      setPageNumber(prev => prev + 1);
    }
  }

  function decrementPageNumber() {
    if (isMobile && displayRightPage) {
      setDisplayRightPage(false);
    }
    else if (isMobile && !displayRightPage) {
      setDisplayRightPage(true);
      setPageNumber(prev => prev - 1)
    }
    else {
      setPageNumber(prev => prev - 1);
    }
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      setIsMobile(false);
      setDisplayRightPage(false);
      setWindowWidth(window.innerWidth);
    }
    else {
      setIsMobile(true);
      setWindowWidth(window.innerWidth);
    }
  })

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
      <section className = "entryG">
          <button 
            className = "polaroidG"
            onClick = {() => zoomInPhoto(JSON.parse(localStorage.getItem(i)))}
          >
            <img src = {JSON.parse(localStorage.getItem(i)).image} className = "photoG"/>
          </button>
          <img src = {TextImage1} className="descriptionG"/>
      </section>
      );
    }
    else
    {
      entries.push(
        <section className = "entryG">
          <img src = {TextImage2} className="descriptionG"/>

          <button 
            className = "polaroidG"
            onClick = {() => zoomInPhoto(JSON.parse(localStorage.getItem(i)))}
          >
            <img src = {JSON.parse(localStorage.getItem(i)).image} className = "photoG"/>
          </button>
      </section>
      );
    }
  }

  const leftPage = entries.slice(0,3);
  const rightPage = entries.slice(3);

  return(
    <section className = "global-photobook-container">
      {isMobile 
        ?
        displayRightPage 
          ?
            <div className="single-page-container">
              {rightPage}
            </div> 
          : 
            <div className="single-page-container">
              {leftPage}
            </div>
        :
        <section className="pages-container">
          <div className="page-container">
            {leftPage}
          </div>
          <div className="page-container">
            {rightPage}
          </div>

        </section>
      }

      <div className = "page-number-container">

        <button 
          onClick = {decrementPageNumber}
          className = "prev-pageG"
        >
          {(pageNumber !== 0 || (isMobile && displayRightPage) ) && <img src = {Arrow} alt = "prev page"/>}
        </button>

        <button 
          onClick = {incrementPageNumber}
          className = "next-pageG"
        >
          {(((1 + pageNumber) * 6 < localStorage.length) || (isMobile && !displayRightPage))
           && <img src = {Arrow} alt = "next page"/> }
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