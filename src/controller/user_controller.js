import User from "../models/user.js";
import Image from "../models/image.js";
import Sharp from "sharp";
import { UploadDir } from "../utils/enum.js";
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

export const uploadAvatar = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if(!user){
        return res.status(400).send('User not found') 
    }else{
        const buffer = await Sharp(req.file.buffer).resize({
            fit: 'contain',
            width: 400,
            height: 400
        }).png().toBuffer()
        const image = await new Image({ data: buffer }).save();

        user.avatar = `${UploadDir.avatar}/${image._id}`
        await user.save()
        res.status(200).send('upload avatar success')
    }
}