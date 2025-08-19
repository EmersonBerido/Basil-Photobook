//Goal of this file: util functions to receive all data and post a single entry

import dotenv from "dotenv";
import mongoose from "mongoose";

//gets values from .env: MONGO_URI
dotenv.config()

//Schema model for global entries
const photoEntry = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  photo : {
    type : String,
    required : true
  },
  characterSelection : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  }
})

//creates model for entries collection
const entryModel = mongoose.model("entries", photoEntry);

export async function getAllData(){
  //creates empty array as default
  let data = [];

  try {
    //opens connection to mongoDB
    await mongoose.connect(process.env.MONGO_URI);
    //gets all the data with newest being first
    data = await entryModel.find().sort({_id : -1});
  } 
  catch (err) {
    console.log("Unable to find entries", err)
  } 
  finally {
    //closes connection to database
    await mongoose.connection.close();
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
    await mongoose.connect(process.env.MONGO_URI);
    await newEntry.save();
  }
  catch (err) {
    console.error("Unable to add new entry to global collection", err)
  }
  finally {
    await mongoose.connection.close();
  }

}


