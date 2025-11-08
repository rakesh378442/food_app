const express=require("express");
const app=express();
app.use(express.json());
const database=require("./mysql");
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
app.listen(3000,()=>{
    console.log("server is running");
});