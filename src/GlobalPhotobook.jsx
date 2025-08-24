import { useState, useEffect } from "react";
import { getDatabaseEntries, getDatabaseEntriesQuery } from "./utils/backendUtils";
import TextImage1 from "./assets/journal-entry-1.png";
import TextImage2 from "./assets/journal-entry-2.png";
import Characters from "./assets/Selections/characters";
import BlueHand from "./assets/blue-hand.png"
import arrow from "./assets/normal-arrow.png"
import "./GlobalPhotobook.css";
import Cat from "./Cat.jsx"

export default function GlobalPhotobook(){
  const [isLoading, setIsLoading] = useState(true);
  const [globalEntries, setGlobalEntries] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayRightPage, setDisplayRightPage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const [isMobile, setIsMobile] = useState(windowWidth < 600);

  const [zoomDisplay, setZoomDisplay] = useState(null);
  


  //checks if pageNumber is less than 0
  useEffect(() => {
    if (pageNumber < 0) {
      setPageNumber(0);
    }

    let data = [];

    (async () => {
      const data = await getDatabaseEntriesQuery(pageNumber)
      setGlobalEntries(data);
      setIsLoading(false);
    })();

  }, [pageNumber])

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

  function zoomInGlobalPhoto(entry){
    setZoomDisplay(() => {
      console.log(`adding name: ${entry.name}, image:${entry.photo}`);
      return {
        name : entry.name,
        image : entry.photo,
        description : entry.description,
        character : entry.characterSelection
      }
    })
  }

  const entries = globalEntries.map((entry, index) => {
    if (index % 2 === 0) {
      return (
        <main className="entryG" key={`globalEntry-${index}`}>
          
          <button className="polaroidG" onClick={() => zoomInGlobalPhoto(entry)}>
            <img src={entry.photo} className="photoG"/>
          </button>
  
          <img src={TextImage1} className="descriptionG"/>
        </main>
      )
    }
    else {
      return (
        <main className="entryG" key={index}>
          <img src={TextImage2} className="descriptionG"/>
          
          <button className="polaroidG" onClick={() => zoomInGlobalPhoto(entry)}>
            <img src={entry.photo} className="photoG"/>
          </button>
        </main>
      )
    }
  })

  const leftPage = entries.slice(0,3);
  const rightPage = entries.slice(3);

  return (
    <main className="global-photobook-container">
      {isLoading && 
      <section className="loading-cat">
        <Cat/>
        <h1>Loading...</h1>

      </section>
      }
      
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
      <section className="page-number-container">
        {(pageNumber > 1 || displayRightPage)&&
          <button onClick={decrementPageNumber} className="prev-pageG">
            <img src={arrow}/>
          </button>
        }
        {globalEntries.length > 3 &&
          <button onClick={incrementPageNumber} className="next-pageG">
            <img src={arrow}/>
          </button>
        }
      </section>
      

      {zoomDisplay !== null &&
        <section className = "zoom-container">
          <img className = "zoom-polaroid" src = {zoomDisplay.image}/>
          
          <div className="zoom-textbox">
            <p className = "zoom-description">{zoomDisplay.description}</p>
            <p className="zoom-name">{zoomDisplay.name}</p>
            <img className="zoom-character" src={Characters[zoomDisplay.character]}/>
            <button className = "text-exit" onClick = {() => setZoomDisplay(null)}>
              <img src = {BlueHand}/>
            </button>
          </div>
          
        </section>
      }
    </main>
  )
}