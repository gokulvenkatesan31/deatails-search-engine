const express=require('express');
const path = require('path')
const app=express();
const studentsData= require("./students.json")



app.set("view engine",'ejs')
app.set("views", path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended: true}))

app.post("/student",(req,res)=>{
    let matchData=""
    let match=false;
    studentsData.forEach((data)=>{
        if(data.name===req.body.studentName){
            matchData=data;
            match=true;
        }
    })
    if(match){
        res.render("student.ejs",matchData)
    }
    else{
        res.send("student is not found")

    }

})

app.get("/student:id",(req,res)=>{
    let {id}=req.params;
    console.log(req.params)
    studentsData.forEach((data)=>{
        if(data.id===id){
            
            matchData=data;
            res.render("student.ejs",matchData)
        }
    })

})

app.get("/",(req,res)=>{
    res.render("home.ejs",{studentsData})
})

app.listen(3000,()=>{
    console.log("listening brooo!!!")
})