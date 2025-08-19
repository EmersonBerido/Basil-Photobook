import mongoose from "mongoose"

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
export const entryModel = mongoose.model("entries", photoEntry);
