import "./Photobook.css"
import {useState} from "react"
import { useEffect } from "react";

export default function Photobook(props){
  //only want to display 6 images: 3 per page
  //should have a state for page number
  //buttons to turn pages
  console.log(props.list);
  const [pageNumber, setPageNumber] = useState(0);

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

  const startingIndex = Math.abs(pageNumber * 6);
  let entries = [];
  for (let i = startingIndex; i < startingIndex + 6; i++){
    if (i >= props.list.length){
      break;
    }
    if (i % 2 === 0){
      entries.push(
      <section className = "entry">
          <div className = "polaroid">
            <img src = {props.list[i].image} className = "photo"/>
          </div>
          <p className = "description">{props.list[i].description}</p>
        </section>
      );
    }
    else
    {
      entries.push(
        <section className = "entry">
        <p className = "description">{props.list[i].description}</p>
        <div className = "polaroid">
          <img src = {props.list[i].image} className = "photo"/>
        </div>
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

    </section>
  )
}