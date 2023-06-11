const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://aravind:password$$123@cluster0.myusfay.mongodb.net/items?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to MONGO DB");

}).catch((err)=>{
    console.log("ERROR",err)
})