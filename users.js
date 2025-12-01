const express=require("express");
const multer=require("multer");
const app=express();
app.use(express.json());
const database=require("./mysql");
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.get("/users",(req,res)=>{
    const viewQuery="SELECT * FROM users";
    database.query(viewQuery,(error,result)=>{
        if(error){
            res.status(500).json({
               message:'database fathing errot'+error 
            });

        }
        else{
            res.status(200).json(result);
        }

    })

})
app.post("/addUser",upload.single("image"),(req,res)=>{
 const image_url=req.file ? req.file.filename:null;
const {name,address,phone_number,food_name}=req.body;

const addQuery= "INSERT INTO users(name,food_name,phone_number,address,image_url) VALUES(?,?,?,?,?)"
const values=[name,food_name,phone_number,address,image_url];
database.query(addQuery,values,(error,result)=>{
    if(error){
        res.status(500).json({
            message:"error"+error
        })

    }
    else{
        res.status(200).json({
            message:name,address,food_name,phone_number,image_url,address

        })
    }

})



})

app.listen(3000,()=>{
    console.log("server is running");
});