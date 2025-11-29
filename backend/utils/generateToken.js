import jwt from "jsonwebtoken";

const generateToken = (res,id)=>{
 const token = jwt.sign({id},process.env.JWT_SECRET,{
   expiresIn:"7d"
 });

 res.cookie("jwt", token,{
  httpOnly:true,
  secure:false,
  maxAge:7*24*60*60*1000
 });
};

export default generateToken;
