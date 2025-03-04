const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()

const app=express()
const RestaurantSchema=require('./schema')



//Connecting to MONGO_DB DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to Database"))
.catch((err)=> console.log("Error",err))

//CRUD OPERATIONS

app.get('/resto',async (req,res)=>{
    try{
    const data= await RestaurantSchema.find()

    if(!data){
        res.status(404).json({message: "No data found"})
    }

    res.status(200).json(data)
}catch(err){
    res.status(500).json({message: "Something went wrong"})
}
})

app.get('/resto/:id',async (req,res)=>{
    try{
    const data= await RestaurantSchema.findById(req.params.id)

    if(!data){
        res.status(404).json({message: "RestaurantSchema not found"})
    }

    res.status(200).json(data)
}catch(err){
    res.status(500).json({message: "Something went wrong"})
}
})

app.post('/resto',async(req,res)=>{
    try {
        const {name,location,cuisine,rating,menu}=req.body

        if(!name){
            res.status(400).json({message: " Validation failed name is required"})
        }
        if(!location){
            res.status(400).json({message: " Validation failed location is required"})
        }
        if(!cuisine){
            res.status(400).json({message: " Validation failed cuisine is required"})
        }
        if(!menu.price){
            res.status(400).json({message: " Validation failed menu price is required"})
        }
        if(!menu.name){
            res.status(400).json({message: " Validation failed menu name is required"})
        }
        

        const newItem=new RestaurantSchema({name,location,cuisine,rating,menu})
        await newItem.save()

        res.status(201).json({message : "created successfully",item:newItem})
        

    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
})

app.put('/resto/:id',async(req,res)=>{
    try {
        const {name,location,cuisine,rating,menu}=req.body

        const updateItem=await RestaurantSchema.findByIdAndUpdate(req.params.id,{name,location,cuisine,rating,menu})

        if(!updateItem){
            res.status(404).json({message: "RestaurantSchema not found"})
        }
        await updateItem.save()

        
        res.status(200).json({message: "Updated successfully",item: updateItem})

    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
})

app.post('/resto/:id',async(req,res)=>{
    try {
        const deletedItem=await RestaurantSchema.findByIdAndDelete(req.params.id)

        if(!deletedItem){
            res.status(404).json({message: "RestaurantSchema not found"})
        }

        res.status(200).json({message: "RestaurantSchema Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
})



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})