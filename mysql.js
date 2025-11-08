const mysql=require("mysql2");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"food_app"

});
db.connect((error)=>{
    
    if(error){
        console.log("database connection error"+error);
    }
    else{
        console.log("database connection");
    }
});
module.exports=db;