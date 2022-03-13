import User from "../models/user.js";

export const getAllUser = async (req, res) =>{
    User.find({},(error, data) =>{
        if(!error){
            res.send(data)
        }else{
            console.log(error)
        }
    })
}