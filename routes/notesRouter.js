const express=require("express")
const {NoteModel}=require("../model/notes.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    let query=req.query
    try{
        const notes=await NoteModel.find(query)
        res.send(notes)
    }
    catch(err){
        res.send({"msg":"Cannot get the users","error":err.message})
    }
})
noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const note=new NoteModel(payload)
        await note.save()
        res.send("Note Created")
    }
    catch(err){
        res.send({"msg":"Not created Notes","error":err.message})

    }
 
   
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:NoteID})
    res.send({"msg":`Note with id:${noteID} has been Deleted`})
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndUpdate({_id:NoteID})
    res.send({"msg":`Note with id:${noteID} has been updated`})
})
module.exports={
    noteRouter
}