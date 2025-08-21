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

export async function dataLength(){
  if (mongoose.connection.readyState === 1) {
    console.log("mongoose is successfully connected, now getting length")
  }
  else {
    console.log("Mongoose couldn't connect in get:", mongoose.connection.readyState, "Now connecting...")
    await connectDB();
  }

  const length = await entryModel.countDocuments();
  return length;
}

export async function GetDataViaIndex(start, end)
{
  if (mongoose.connection.readyState === 1) {
    console.log("mongoose is successfully connected")
  }
  else {
    console.log("Mongoose couldn't connect", mongoose.connection.readyState, "Now connecting...")
    await connectDB();
  }

  let data = [];

  try {
    const amount = end - start;

    if (amount <= 0) {
      console.error("Start index must be less than end index");
      return data;
    }
    
    //gets data starting from start index, and fills it with amount of entries
    data = await entryModel.find()
      .sort({_id : -1})
      .skip(start)
      .limit(amount);
  }
  catch (err) {
    console.error("error collecting data", err);
  }

  return data;
}


