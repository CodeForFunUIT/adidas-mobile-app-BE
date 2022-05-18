import User from "../models/user.js";
import Image from "../models/image.js";
import Sharp from "sharp";
import { UploadDir } from "../utils/enum.js";
import Address from "../models/address.js";
export const getAllUser = async (req, res) =>{
    const user = await User.find()
    // {},(error, data) =>{
    //     if(!error){
    //         res.send(data)
    //     }else{
    //         console.log(error)
    //     }
    // }
    
    // await user.populate('products').execPopulate()
    res.send(user)
    // console.log(user.products)
}

export const updateInforUser = async (req, res) =>{
    try {
        const body = req.body
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id,{$set: {fullname: body.fullName, dateOfBirth: Date(body.dateOfBirth)}}, {new: true}).exec()
        if(user){
            return res.send(user)
        }
        res.status(400).send("no user found")
        
    
    } catch (error) {
        res.send(error.toString())        
    }
}

export const getListFavorites = async (req, res) =>{

    const {id} = req.params;

    const user = await User.findById(id).populate({path: 'products', select: ['image', 'name', 'price', 'introduction']}).exec()
    if(!user){
        throw new Error('user not found')
    }

    res.send(user.products)
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

export const addUserAddress  = async (req, res) => {
    try {
        const {id} = req.params
                
        const address = await Address.find({...req.body}) 

        if(address.length != 0){
            throw new Error('address exist')
        }

        await new Address({ ...req.body, idUser: id}).save()

        // const user = await User.findByIdAndUpdate(id,{$set: {address: body}},{new: true})
        // if(!user){
        //     throw new Error('user not found')
        // }
        res.send('add new address success')
    } catch (error) {
        res.status(400).send(error.toString())    
    }
}

export const getUserAddress  = async (req, res) => {
    try {
        const {id} = req.params
        
        // const user = await User.findByIdAndUpdate(id,{$addToSet: {address: body}},{new: true}).exec()
        // if(!user){
        //     throw new Error('user not found')
        // }
        const user = await User.findById(id).populate({path: 'address'}).exec()
        res.send(user.address)
    } catch (error) {
        res.status(400).send(error.toString())    
    }   
}

export const updateUserAddress = async (req, res) => {
    try {
        const {id} = req.params
        const address = await Address.findByIdAndUpdate(id, {...req.body}, {new: true}).exec()
        if(!address){
            throw new Error('address not found')
        }
        res.send(address)
    } catch (error) {
        res.status(400).send(error.toString())    
    }   
}


export const getUserById = async (req, res) =>{
    try {
      const {id} = req.params
      const user = await User.findById(id)
      if(user){
        return res.send(user)
      }
    } catch (error) {
      res.status(400).send("user not found")
    }
  }