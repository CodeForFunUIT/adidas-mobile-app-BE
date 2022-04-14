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

export const getAvatar = async (req, res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
}