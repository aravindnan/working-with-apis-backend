const mongoose = require("mongoose")
const express= require("express")
const Item = require("./models/item")
const User= require("./models/user")
const app= express()
const jwt= require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const PORT=8000;
var cors = require('cors');
app.use(cors());



mongoose.connect("mongodb+srv://aravind:password$$123@cluster0.myusfay.mongodb.net/items?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
.then(()=>{
    console.log("Connected to  MONGO DB");
    app.listen(PORT,()=>{
        console.log("Server running in ",PORT)
    })
}).catch((err)=>{
    console.log("ERROR",err)
})

app.use(express.json())


app.post("/add-item",async(req,res)=>{

    try {
        const item = await Item.create(req.body);
        res.status(200);
        res.send(item)
        
    } catch (error) {
        res.status(500)
        res.send({message:error})
        
    }
})

app.put("/edit-single-item/:id",async(req,res)=>{
    try {
        const editID=req.params.id
        const editItem = await Item.findOneAndUpdate({itemID:editID},req.body)
        if(!editItem){
            return res.status(404).json({message:`item Not found with ID ${editID}`})
            
        }
        console.log(editItem)
        res.status(200).json(editItem)

        
    } catch (error) {
        console.log("ERROR:",error)
    }
})




app.get("/get-all-items",async(req,res)=>{
    try {
        const items= await Item.find({});
        res.status(200).json(items)
    } catch (error) {
        console.log("ERROR:",error)
        
    }
})



app.get("/get-single-item/:id",async(req,res)=>{
    try{
        const findID=req.params.id
        const singleItem=await Item.findOne({itemID:findID})
        res.status(200).json(singleItem)
    }
    catch (error) {
        console.log("ERROR:",error)
        
    }
})

app.delete("/delete-single-item/:id",async(req,res)=>{
    try {
        const delID = req.params.id;
        const delResult=await Item.deleteOne({itemID:delID})
        res.status(200).json(delResult)
        
    } catch (error) {
        console.log("ERROR:",error)
    }
})


app.post("/login", async(req,res)=>{

    try {

        const {username,password}=req.body;

        if (!(username && password)) {
            res.status(400).send("All input is required");
          }

        const user = await User.findOne({ username });

        if(user && (await bcrypt.compare(password,user.password))){
            const token= jwt.sign(
                {user_id:user._id,username},
                "sdfghjklkjhgfdsdfghjklkjgfrtyuiolnbfr567ujbvcder6yujbvcdertyuikjnbvxdfgh",
                {expiresIn: "2h"}
            );
            user.token = token;
            res.status(200).json({
                loginStatus:true,
                message:"Login Successful"
            });
        }
        res.status(400).json({
            loginStatus:false,
            message:"Invalid Credentials"
        });
        
    } catch (error) {
        console.log("Error:",error)
    }

 
})

app.post("/register",async (req,res)=>{

    try {
        const{fullName,dateOfBirth,username,mobile,password}=req.body

        if (!(mobile && password && fullName && username)) {
            res.status(400).send("All input is required");
          }
    
          const oldUser = await User.findOne({ username }); 
          
          if(oldUser){
            return res.status(409).send("Username already taken.");
          }
    
          encryptedPassword = await bcrypt.hash(password, 10);
    
          const user = await User.create({
            fullName,
            mobile,
            username,
            dateOfBirth, 
            password: encryptedPassword,
          });
    
          const token = jwt.sign(
            { user_id: user._id, username },
           "sdfghjklkjhgfdsdfghjklkjgfrtyuiolnbfr567ujbvcder6yujbvcdertyuikjnbvxdfgh",
            {
              expiresIn: "2h",
            }
          );

          user.token = token;
    
          res.status(201).json(user);
        
    } 
    catch (error) 
    {
      console.log(error);   
    }

   

})