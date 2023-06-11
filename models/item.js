const mongoose= require("mongoose")

const itemSchema= mongoose.Schema({
    itemName:{
        type:String,
        required:[true,"Please Enter Item Name"]
    },
    itemPrice:{
        type:String,
        default:"0$",
        required:[true,"Please Enter Item Price"]
    },
    itemID:{
        type:String,
        required:[true,"Please Enter Item ID"]
    },
    itemAvailability:{
        type:Boolean,
        required:[true,"Please Mention Availabilty"]
    },
    itemDate:{
        type:Date,
        required:[true,"Please Enter Item Date"]
    },

    


},{timestamps:true})

 const Item =mongoose.model("Item",itemSchema)
 module.exports=Item;