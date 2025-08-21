import { imageToURL } from "./cloudUtil";

export async function getDatabaseEntries()
{
  let data = [];
  await fetch("https://basil-photobook.onrender.com/entries")
      .then(res => res.json())
      .then(entries => data = entries)
      .catch(err => console.error("Unable to connect to backend", err))

  return data;
}

//all arguments are strings
export async function uploadToDatabase(name, image, character, description){
  
  try {
    const newImageurl = await imageToURL(image);
    console.log("Uploading to the database...");
    fetch("https://basil-photobook.onrender.com/entries", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        name : name,
        photo : newImageurl,
        characterSelection : character,
        description : description
      })
    }) 
      .catch(err => console.error("Error in upload:", err))

  }
  catch (err) {
    console.error("Error in uploadToDatabase:", err);
  }

  console.log("leaving function...")
}