import express from "express";
import cors from "cors";


import { getAllData, postData, connectDB, dataLength, GetDataViaIndex } from "./utils/entries.js";

const PORT = 8000;
const server = express();

//CORS; only github is able to use it, and it only allows user to retrieve and send data
server.use(cors())
//add limits later

await connectDB();

// const test = await getAllData();
// console.log(test);

server.use(express.json())

// const length = await dataLength();
// console.log("length of data: ", length);
// const data = await GetDataViaIndex(3, 9);
// console.log("data from getDataViaIndex:", data);


server.get('/entries', async (req, res) => {
  //add an if else for whether or not there are query params; pageNum=#
  const pageNum = req.query.pageNum;

  //returns 6 entries per page
  if (pageNum){
    const startIndex = (pageNum - 1) * 6;
    let entryCount = startIndex + 6;

    const dataLength = await dataLength();
    if (entryCount > dataLength) {
      entryCount = dataLength;
    }


    
    
  }

  //returns all entries
  console.log("successfully in get");
  const data = await getAllData();
  console.log("in get (after getting data)")
  res.json(data);
})

server.post('/entries', async (req, res) => {
  console.log("successfully in post")
  
  const newEntry = {
    name : req.body.name,
    photo : req.body.photo,
    characterSelection : req.body.characterSelection,
    description : req.body.description
  }

  await postData(newEntry);
})

server.listen(PORT, () => console.log("this server is working :)"))