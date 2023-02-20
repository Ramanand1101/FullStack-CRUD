const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    author:String,
    user:String
       
})
const NoteModel=mongoose.model("noted",noteSchema)

module.exports={
    NoteModel
}