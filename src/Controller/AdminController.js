const adminModel = require('../Models/adminModel')
const questionModel = require('../Models/questionModel')
const jwt = require('jsonwebtoken')

const createAdmin = async (req, res)=> {
    try{
        let data = req.body

        let admin = await adminModel.create(data)
        return res.status(201).send({status : true, message : "successfully created admin", data : admin})

    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}


const adminLogin = async (req, res)=>{
    try{
        let data = req.body
         let { email, password} = data
       

         if(!email) return res.status(400).send({status : false, message : "please provide email"});
         if(!password) return res.status(400).send({status : false, message : "please provide password"});

         let payload = {
            email : email
            ,password : password
         }

         const  token = jwt.sign(payload,"Examination" ,  {expiresIn: "60m"} )
          
         return res.status(200).send({ status: true, message: "token is successfully generated", data: token})
        }
    catch(err){
        return res.status(500).send({status : false , message : err.message}) 
    }
}
module.exports = { createAdmin , adminLogin}


