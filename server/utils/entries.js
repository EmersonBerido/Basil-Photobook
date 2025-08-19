//Goal of this file: util functions to receive all data and post a single entry

import { entryModel } from "../models/entryModel";

export async function getAllData(){
  //creates empty array as default
  let data = [];

  try {
    //gets all the data with newest being first
    data = await entryModel.find().sort({_id : -1});
  } 
  catch (err) {
    console.log("Unable to find entries", err)
  } 
  
  return data;
}

export async function postData(entry){
  //TESTED; newEntry properly works
  const newEntry = new entryModel({
    name : entry.name,
    photo : entry.photo,
    characterSelection : entry.characterSelection,
    description : entry.description
  })

  try {
    await newEntry.save();
  }
  catch (err) {
    console.error("Unable to add new entry to global collection", err)
  }

}


