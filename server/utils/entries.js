//Goal of this file: util functions to receive all data and post a single entry

import { entryModel } from "../models/entryModel.js";
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

export async function connectDB()
{
  if (mongoose.connection.readyState === 1) {
    console.log("already connected to mongo");
    return;
  }
  else if (mongoose.connection.readyState === 2){
    console.log("currently connecting to mongo")
    mongoose.connection.once("connected", () => {
      console.log("Connection is now finished processing")
    })
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose is now connected");
    console.log("mongoose status:", mongoose.connection.readyState)
  }
  catch (err) {
    console.log("Mongoose couldn't connect", err)
  }
}

export async function getAllData(){
  if (mongoose.connection.readyState === 1) {
    console.log("mongoose is successfully connected in get")
  }
  else {
    console.log("Mongoose couldn't connect in get:", mongoose.connection.readyState, "Now connecting...")
    await connectDB();
  }

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


