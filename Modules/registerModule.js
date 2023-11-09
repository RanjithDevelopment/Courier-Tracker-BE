const user= require("../Models/userModel");
const packageDetails = require("../Models/courierModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

module.exports.signup = async(req,res,next)=>{
 
    try{
//check for if the user already exist in db

const existUser= await user.findOne({email:req.body.email});
if(existUser)return res.status(400).send({msg: "you are already an exists user"});
//check for password matching 
const isSamePassword = checkPassword(req.body.password,req.body.confrimPassword);
if(!isSamePassword){
    res.status(400).send({msg:"Password does not match"});
}
else{
    delete req.body.confrimPassword;
    //password encryption 
const randomstring= await bcrypt.genSalt(15);
req.body.password=await bcrypt.hash(req.body.password,randomstring);
//save to DataBadse
let newUser= await new user({...req.body});
await newUser.save();
//const insertedResponse= await db.collection("Users").insertOne({...req.body});
res.status(200).send("user creadted successfully");
}

    }
    catch(err){
        console.log(err);
    }
};



//password match checking program 
const  checkPassword =(password,confrimpassword)=>{
return password != confrimpassword ? false: true;
};




module.exports.signin =async(req,res,next)=>{
//email validation for signin 

const existUser= await user.findOne({email:req.body.email});

if(!existUser)return res.status(400).send({msg: "you are not a registered user ,please register yourself"});

//password validation for signin
const isValid= await bcrypt.compare(req.body.password,existUser.password);

if(!isValid)return res.status(400).send({msg:"password incorrect"});
//token generation 
const token= jwt.sign({existUser},process.env.SECRET_KEY,{expiresIn:"1h"});

res.send(token);
};

module.exports.getUsers = async(req,res)=>{
    try {
        const allUsers = await user.find({});
        res.status(200).send(allUsers) 
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"can't able to fetch the Users Data"})
    }
}
module.exports.deleteUser = async(req,res)=>{
    try {
       
        const isValid = ObjectId.isValid(req.params.id);
       
     if(isValid){
        const remove = await user.deleteOne({ _id: new ObjectId(req.params.id) });
     if(remove){
        return res.status(200).json({ remove });
     }
    }
     res.status(500).send({msg:"can't able to delete the user"})
    } catch (error) {
        console.error('Error deleting user data:', error);
        res.status(400).send('user data not deleted');
    }
}
module.exports.getbytrackingId = async(req,res)=>{
try {
    const isValid = ObjectId.isValid(req.params.Id);
   
       
    if(isValid){
       const remove = await packageDetails.findById({ _id: new ObjectId(req.params.Id) });
    if(remove){
       return res.status(200).json( remove );
    }
   }
    res.status(500).send({msg:"cant fetch the package data"})
} catch (error) {
    console.error('Error in tracking package data:', error);
        res.status(400).send('Error in tracking package data');
}
}