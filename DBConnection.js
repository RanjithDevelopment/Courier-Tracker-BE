const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
DB=async()=>{
    try {
       
       await mongoose.connect(process.env.MONGODB_URL);
       console.log("connection is established");
  
}
        
     catch (error) {

        console.log('DB Error',error);
        
    }
}
 
 module.exports = DB;