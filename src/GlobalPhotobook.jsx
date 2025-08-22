import { useState, useEffect } from "react";
import { getDatabaseEntries, getDatabaseEntriesQuery } from "./utils/backendUtils";
import TextImage1 from "./assets/journal-entry-1.png";
import TextImage2 from "./assets/journal-entry-2.png";
import "./GlobalPhotobook.css";

export default function GlobalPhotobook(){
  const [globalEntries, setGlobalEntries] = useState([]);
  const [entriesStack, setEntriesStack] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayRightPage, setDisplayRightPage] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
  const [isMobile, setIsMobile] = useState(windowWidth < 600);

  console.log("window width:", windowWidth)

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

  function incrementPageNumber() {
    if (isMobile && !displayRightPage) {
      setDisplayRightPage(true);
    }
    else {
      setPageNumber(prev => prev + 1);
    }
  }

  function decrementPageNumber() {
    if (isMobile && displayRightPage) {
      setDisplayRightPage(false);
    }
    else {
      setPageNumber(prev => prev - 1);
    }
  }

  const entries = globalEntries.map((entry) => {
    return (
      <main className="entry">
        <div className="polaroid">
          <img src={entry.photo} className="photo"/>
        </div>

        <img src={TextImage1}/>
      </main>
    )
  })

  const leftPage = entries.slice(0,3);
  const rightPage = entries.slice(3);


  return (
    <main className="global-photobook-container">
      {isMobile 
        ?
        displayRightPage 
          ?
            <div className="right-page-container">
              {rightPage}
            </div> 
          : 
            <div className="left-page-container">
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
        <button onClick={decrementPageNumber}>
          prev
        </button>
        <button onClick={incrementPageNumber}>
          next
        </button>
      </section>
    </main>
  )
}