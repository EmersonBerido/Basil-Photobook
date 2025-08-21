import { useState, useEffect } from "react";
import { getDatabaseEntries, getDatabaseEntriesQuery } from "./utils/backendUtils";

export default function GlobalPhotobook(){
  const [globalEntries, setGlobalEntries] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  
  useEffect(() => {
    const data = (async () => {
      const entries = await getDatabaseEntriesQuery(pageNumber);
      console.log("Fetched Global Entries:", entries);
      return entries;
    })();
    console.log("Global entries before setting it to state", data);
    setGlobalEntries(data);
  }, []);

  console.log("state global entries", globalEntries)

  //checks if pageNumber is less than 0
  useEffect(() => {
    if (pageNumber < 0) {
      setPageNumber(0);
    }

  }, [pageNumber])
  
}