const express=require("express")
const {connection}=require("./db")
require('dotenv').config()
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/notesRouter")
const{authenticate}=require("./middleware.authenticaion/authenticate.middleware")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
          
    }
    catch(err){
        console.log("Cannot connect to DB")
    }
    console.log(`Running the server at port 9090` )
})
