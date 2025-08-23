import { useState, useEffect } from "react";
import { getDatabaseEntries, getDatabaseEntriesQuery } from "./utils/backendUtils";
import TextImage1 from "./assets/journal-entry-1.png";
import TextImage2 from "./assets/journal-entry-2.png";
import "./GlobalPhotobook.css";

export default function GlobalPhotobook(){
  const [globalEntries, setGlobalEntries] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayRightPage, setDisplayRightPage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const [isMobile, setIsMobile] = useState(windowWidth < 600);

  console.log("window width:", windowWidth)
  console.log("isMobile:",isMobile, "displayRightPage:",displayRightPage)

  //checks if pageNumber is less than 0
  useEffect(() => {
    if (pageNumber < 0) {
      setPageNumber(0);
    }

    let data = [];

    (async () => {
      data = await getDatabaseEntriesQuery(pageNumber)
      setGlobalEntries(data);
    })();

  }, [pageNumber])
  console.log("pg num", pageNumber)

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
  console.log("New Size", windowWidth)

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

  const entries = globalEntries.map((entry, index) => {
    if (index % 2 === 0) {
      return (
        <main className="entryG">
          <div className="polaroidG">
            <img src={entry.photo} className="photoG"/>
          </div>
  
          <img src={TextImage1} className="descriptionG"/>
        </main>
      )
    }
    else {
      return (
        <main className="entryG">
          <img src={TextImage1} className="descriptionG"/>
          
          <div className="polaroidG">
            <img src={entry.photo} className="photoG"/>
          </div>
        </main>
      )
    }
  })

  const leftPage = entries.slice(0,3);
  const rightPage = entries.slice(3);


  return (
    <main className="global-photobook-container">
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
          <button onClick={decrementPageNumber}>
            prev
          </button>
        }
        {globalEntries.length > 0 &&
          <button onClick={incrementPageNumber}>
            next
          </button>
        }
      </section>
    </main>
  )
}