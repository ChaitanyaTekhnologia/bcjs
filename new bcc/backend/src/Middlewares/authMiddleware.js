// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('x-auth-token');
  
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }
//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;

const express = require('express');
const { query } = require('../utils/database');
const authRouter = express.Router();
const authentication=async function(req,res,next){
try{
    let token=req.headers['authorization']
    if(!token) return res.status(400).send({status:false,message:"Please give a Bearer Token"})

    if(token.startsWith("Bearer ")){
        token=token.substring(7, token.length);
    }

    jwt.verify(token,"ProductMnagementGroup24",(err,decode)=>{
        if(err){
            let msg=err.message==="jwt expired"? "Token is expired" : "Token is Invalid"
            return res.status(400).send({status:false, message:msg})
        }
        req.pass=decode

        next()
    })
}catch(error){
    return res.status(500).send({status:false,error:error.message})
}
}